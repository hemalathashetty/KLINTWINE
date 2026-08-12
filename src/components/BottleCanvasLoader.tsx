import { forwardRef, lazy, Suspense } from 'react';

const BottleCanvasLazy = lazy(() => import('./BottleCanvas'));

const BottleCanvasLoader = forwardRef<any, any>(function BottleCanvasLoader(props: any, ref: any) {
  return (
    <Suspense fallback={null}>
      {/* cast ref/props to any because LazyExoticComponent typing doesn't preserve forwardRef generics */}
      <BottleCanvasLazy {...(props as any)} ref={ref as any} />
    </Suspense>
  );
});

export default BottleCanvasLoader;
