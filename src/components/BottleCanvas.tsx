import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export interface BottleCanvasHandle {
  group: THREE.Group | null;
  setVariant: (variant: 'veltliner' | 'white' | 'red', duration?: number) => void;
  setOpacity: (opacity: number, duration?: number) => void;
}

interface BottleCanvasProps {
  onReady?: () => void;
  float?: boolean;
}

const BottleCanvas = forwardRef<BottleCanvasHandle, BottleCanvasProps>(({ onReady, float = true }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rootGroupRef = useRef<THREE.Group>(null);
  const veltlinerMeshRef = useRef<THREE.Mesh>(null);
  const whiteMeshRef = useRef<THREE.Mesh>(null);
  const redMeshRef = useRef<THREE.Mesh>(null);

  const veltlinerMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const whiteMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const redMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const activeVariantRef = useRef<'veltliner' | 'white' | 'red'>('veltliner');
  const rootGroupOpacityRef = useRef<{ val: number }>({ val: 1.0 });

  useImperativeHandle(ref, () => ({
    group: rootGroupRef.current,
    setVariant: (variant, duration = 0.5) => {
      if (activeVariantRef.current === variant) return;
      activeVariantRef.current = variant;

      const vMat = veltlinerMatRef.current;
      const wMat = whiteMatRef.current;
      const rMat = redMatRef.current;
      const baseO = rootGroupOpacityRef.current.val;

      if (!vMat || !wMat || !rMat) return;

      if (variant === 'veltliner') {
        if (veltlinerMeshRef.current) veltlinerMeshRef.current.visible = true;
        if (whiteMeshRef.current) whiteMeshRef.current.visible = true;
        if (redMeshRef.current) redMeshRef.current.visible = true;

        gsap.to(vMat, { opacity: 1.0 * baseO, duration, ease: 'power2.inOut' });
        gsap.to(wMat, { opacity: 0, duration, ease: 'power2.inOut', onComplete: () => { if (whiteMeshRef.current) whiteMeshRef.current.visible = false; } });
        gsap.to(rMat, { opacity: 0, duration, ease: 'power2.inOut', onComplete: () => { if (redMeshRef.current) redMeshRef.current.visible = false; } });
      } else if (variant === 'white') {
        if (veltlinerMeshRef.current) veltlinerMeshRef.current.visible = true;
        if (whiteMeshRef.current) whiteMeshRef.current.visible = true;
        if (redMeshRef.current) redMeshRef.current.visible = true;

        gsap.to(vMat, { opacity: 0, duration, ease: 'power2.inOut', onComplete: () => { if (veltlinerMeshRef.current) veltlinerMeshRef.current.visible = false; } });
        gsap.to(wMat, { opacity: 1.0 * baseO, duration, ease: 'power2.inOut' });
        gsap.to(rMat, { opacity: 0, duration, ease: 'power2.inOut', onComplete: () => { if (redMeshRef.current) redMeshRef.current.visible = false; } });
      } else if (variant === 'red') {
        if (veltlinerMeshRef.current) veltlinerMeshRef.current.visible = true;
        if (whiteMeshRef.current) whiteMeshRef.current.visible = true;
        if (redMeshRef.current) redMeshRef.current.visible = true;

        gsap.to(vMat, { opacity: 0, duration, ease: 'power2.inOut', onComplete: () => { if (veltlinerMeshRef.current) veltlinerMeshRef.current.visible = false; } });
        gsap.to(wMat, { opacity: 0, duration, ease: 'power2.inOut', onComplete: () => { if (whiteMeshRef.current) whiteMeshRef.current.visible = false; } });
        gsap.to(rMat, { opacity: 1.0 * baseO, duration, ease: 'power2.inOut' });
      }
    },
    setOpacity: (opacity, duration = 0.3) => {
      if (duration === 0) {
        rootGroupOpacityRef.current.val = opacity;
        const targetMat = activeVariantRef.current === 'veltliner' ? veltlinerMatRef.current : activeVariantRef.current === 'white' ? whiteMatRef.current : redMatRef.current;
        if (targetMat) targetMat.opacity = opacity;
        if (rootGroupRef.current) rootGroupRef.current.visible = opacity > 0.001;
      } else {
        gsap.to(rootGroupOpacityRef.current, {
          val: opacity,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            const currentO = rootGroupOpacityRef.current.val;
            if (rootGroupRef.current) rootGroupRef.current.visible = currentO > 0.001;
            const activeV = activeVariantRef.current;
            if (activeV === 'veltliner' && veltlinerMatRef.current) veltlinerMatRef.current.opacity = currentO;
            if (activeV === 'white' && whiteMatRef.current) whiteMatRef.current.opacity = currentO;
            if (activeV === 'red' && redMatRef.current) redMatRef.current.opacity = currentO;
          }
        });
      }
    }
  }));

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    (renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    (rootGroupRef as any).current = rootGroup;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Load Official 4K Studio Renders from scraped uploads
    const tVeltliner = textureLoader.load('/uploads/gruner_veltliner_632b1976ea.webp');
    const tWhite = textureLoader.load('/uploads/white_blend_3978284690.webp');
    const tRed = textureLoader.load('/uploads/red_blend_e2fec91509.webp');

    [tVeltliner, tWhite, tRed].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
    });

    // Proportional 3D Plane Geometry matching 4K resolution aspect ratio (2728 x 4096)
    const planeGeo = new THREE.PlaneGeometry(4.0, 6.0, 32, 32);

    // Materials
    const matVeltliner = new THREE.MeshStandardMaterial({
      map: tVeltliner,
      transparent: true,
      opacity: 1.0,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const matWhite = new THREE.MeshStandardMaterial({
      map: tWhite,
      transparent: true,
      opacity: 0.0,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const matRed = new THREE.MeshStandardMaterial({
      map: tRed,
      transparent: true,
      opacity: 0.0,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    (veltlinerMatRef as any).current = matVeltliner;
    (whiteMatRef as any).current = matWhite;
    (redMatRef as any).current = matRed;

    // Meshes
    const meshVeltliner = new THREE.Mesh(planeGeo, matVeltliner);
    const meshWhite = new THREE.Mesh(planeGeo, matWhite);
    const meshRed = new THREE.Mesh(planeGeo, matRed);

    meshVeltliner.position.set(0, 0, 0);
    meshWhite.position.set(0, 0, 0.01);
    meshRed.position.set(0, 0, 0.02);

    meshWhite.visible = false;
    meshRed.visible = false;

    (veltlinerMeshRef as any).current = meshVeltliner;
    (whiteMeshRef as any).current = meshWhite;
    (redMeshRef as any).current = meshRed;

    rootGroup.add(meshVeltliner);
    rootGroup.add(meshWhite);
    rootGroup.add(meshRed);

    if (onReady) {
      onReady();
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating motion
      if (float && rootGroup) {
        rootGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();
      planeGeo.dispose();
      matVeltliner.dispose();
      matWhite.dispose();
      matRed.dispose();
      tVeltliner.dispose();
      tWhite.dispose();
      tRed.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
});

export default BottleCanvas;
