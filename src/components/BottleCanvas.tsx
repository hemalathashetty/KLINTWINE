import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BottleCanvasProps {
  variant: 'veltliner' | 'white' | 'red';
  scale?: number;
  yPercent?: number; // visual vertical offset
  float?: boolean;
  scrollTriggerType?: 'hero' | 'none';
  rotationY?: number;
  rotationZ?: number;
}

export default function BottleCanvas({
  variant,
  scale = 1.22,
  yPercent = 0,
  float = false,
  scrollTriggerType = 'none',
  rotationY = 0,
  rotationZ = 0
}: BottleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);

  const getTextureUrls = (v: 'veltliner' | 'white' | 'red') => {
    switch (v) {
      case 'white':
        return {
          body: '/uploads/wine_white_bottle_texture_49ecbf6e48.webp',
          cover: '/uploads/wine_white_cover_texture_f096ed3faa.webp'
        };
      case 'red':
        return {
          body: '/uploads/wine_red_bottle_texture_1ec4e2fed6.webp',
          cover: '/uploads/wine_red_cover_texture_4928d1e811.webp'
        };
      case 'veltliner':
      default:
        return {
          body: '/uploads/wine_veltliner_bottle_texture_e4ed053c52.webp',
          cover: '/uploads/wine_veltliner_cover_texture_4a741b879a.webp'
        };
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting setup (Premium studio highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);

    const rimLightLeft = new THREE.DirectionalLight(0xfff7e6, 1.5);
    rimLightLeft.position.set(-5, 2, -3);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLightRight.position.set(5, -2, -3);
    scene.add(rimLightRight);

    // 5. Build Wine Bottle using LatheGeometry
    const { body, cover } = getTextureUrls(variant);
    const textureLoader = new THREE.TextureLoader();

    const bodyTexture = textureLoader.load(body);
    bodyTexture.wrapS = THREE.RepeatWrapping;
    bodyTexture.wrapT = THREE.ClampToEdgeWrapping;

    const coverTexture = textureLoader.load(cover);
    coverTexture.wrapS = THREE.RepeatWrapping;
    coverTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Lathe profile points for body & shoulders
    const bodyPoints: THREE.Vector2[] = [];
    bodyPoints.push(new THREE.Vector2(0, -1.68));
    bodyPoints.push(new THREE.Vector2(0.28, -1.74));
    bodyPoints.push(new THREE.Vector2(0.54, -1.80));
    bodyPoints.push(new THREE.Vector2(0.58, -1.74));
    bodyPoints.push(new THREE.Vector2(0.58, 0.35));
    // Shoulder curve
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const y = 0.35 + t * 0.75;
      const x = 0.58 - 0.39 * Math.sin(t * Math.PI / 2);
      bodyPoints.push(new THREE.Vector2(x, y));
    }
    // Neck cylinder
    bodyPoints.push(new THREE.Vector2(0.19, 1.1));
    bodyPoints.push(new THREE.Vector2(0.19, 1.35));
    bodyPoints.push(new THREE.Vector2(0, 1.35));

    // Lathe profile points for cover (foil cap)
    const coverPoints: THREE.Vector2[] = [];
    coverPoints.push(new THREE.Vector2(0, 1.35));
    coverPoints.push(new THREE.Vector2(0.192, 1.35));
    coverPoints.push(new THREE.Vector2(0.192, 1.95));
    coverPoints.push(new THREE.Vector2(0.202, 1.95));
    coverPoints.push(new THREE.Vector2(0.202, 2.05));
    coverPoints.push(new THREE.Vector2(0, 2.05));

    const bodyGeom = new THREE.LatheGeometry(bodyPoints, 64);
    const coverGeom = new THREE.LatheGeometry(coverPoints, 64);

    const bodyMat = new THREE.MeshStandardMaterial({
      map: bodyTexture,
      roughness: 0.12,
      metalness: 0.05,
      transparent: true,
      opacity: 0.98
    });

    const coverMat = new THREE.MeshStandardMaterial({
      map: coverTexture,
      roughness: 0.25,
      metalness: 0.55
    });

    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
    const coverMesh = new THREE.Mesh(coverGeom, coverMat);

    // Center mesh geometry vertically so rotation/tilting occurs around mass center
    bodyMesh.position.y = -0.125;
    coverMesh.position.y = -0.125;

    const bottleGroup = new THREE.Group();
    bottleGroup.add(bodyMesh);
    bottleGroup.add(coverMesh);
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    // Apply scale and default offset/rotation
    bottleGroup.scale.set(scale, scale, scale);
    bottleGroup.position.y = yPercent;
    bottleGroup.rotation.y = rotationY;
    bottleGroup.rotation.z = rotationZ;

    // 6. ScrollTrigger animation integration for performance (60fps)
    const ctx = gsap.context(() => {
      if (scrollTriggerType === 'hero') {
        // Rotate 180 degrees on Y-axis (reveal back label) and tilt 22 degrees (0.38 rad) on scroll
        gsap.to(bottleGroup.rotation, {
          y: Math.PI,
          z: 0.38,
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        // Translate the bottle vertical and horizontal position to match the text layout
        gsap.to(bottleGroup.position, {
          y: yPercent - 0.15,
          x: 0.15,
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // 7. Animation loop for rendering and optional idle float effect
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (float && bottleGroupRef.current) {
        const elapsedTime = (performance.now() - startTime) * 0.001;
        // Subtle floating movement
        bottleGroupRef.current.position.y = yPercent + Math.sin(elapsedTime * 1.5) * 0.08;
        // Mild rotation wobble
        bottleGroupRef.current.rotation.y = Math.cos(elapsedTime * 0.8) * 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      bodyGeom.dispose();
      coverGeom.dispose();
      bodyMat.dispose();
      coverMat.dispose();
    };
  }, [variant, scale, yPercent, float, scrollTriggerType]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
