import { useEffect, useRef } from 'react';

export default function LivingForm() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = true;
    let time = 0;
    let lastTime = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    function resize() {
      const bounds = element!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      element!.width = width * ratio;
      element!.height = height * ratio;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(stamp: number) {
      if (!visible || document.hidden) { frame = 0; return; }
      const elapsed = lastTime ? Math.min(stamp - lastTime, 50) : 16;
      lastTime = stamp;
      if (!motion.matches) time += elapsed * 0.00015;
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;
      context!.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.26;
      const yaw = time * 0.3 + pointer.x * 0.45;
      const pitch = -0.45 + pointer.y * 0.3;
      for (let ring = 0; ring < 65; ring++) {
        const u = ring / 65 * Math.PI * 2;
        context!.beginPath();
        let depth = 0;
        for (let point = 0; point <= 90; point++) {
          const v = point / 90 * Math.PI * 2;
          const ripple = Math.sin(u * 3 + time) * 0.16;
          const radius = 1.14 + 0.43 * Math.cos(v) + ripple;
          const x = radius * Math.cos(u);
          const y = radius * Math.sin(u);
          const z = 0.56 * Math.sin(v) + 0.32 * Math.sin(u * 3 + time);
          const rotatedX = x * Math.cos(yaw) + z * Math.sin(yaw);
          const rotatedZ = -x * Math.sin(yaw) + z * Math.cos(yaw);
          const rotatedY = y * Math.cos(pitch) - rotatedZ * Math.sin(pitch);
          depth = y * Math.sin(pitch) + rotatedZ * Math.cos(pitch);
          const perspective = 3.8 / (3.8 + depth);
          const screenX = width / 2 + rotatedX * scale * perspective;
          const screenY = height / 2 + rotatedY * scale * perspective;
          if (point === 0) context!.moveTo(screenX, screenY);
          else context!.lineTo(screenX, screenY);
        }
        context!.strokeStyle = `rgba(${160 + Math.round(Math.sin(u) * 30)}, ${186 + Math.round(Math.cos(u) * 20)}, 135, ${0.3 + (depth + 1.8) * 0.1})`;
        context!.lineWidth = 0.8;
        context!.stroke();
      }
      frame = motion.matches ? 0 : requestAnimationFrame(draw);
    }

    function start() {
      if (!frame && visible && !document.hidden) {
        lastTime = 0;
        frame = requestAnimationFrame(draw);
      }
    }
    function move(event: PointerEvent) {
      if (motion.matches || event.pointerType !== 'mouse') return;
      const bounds = element!.getBoundingClientRect();
      pointer.targetX = (event.clientX - bounds.left) / width - 0.5;
      pointer.targetY = (event.clientY - bounds.top) / height - 0.5;
      start();
    }
    function leave() { pointer.targetX = 0; pointer.targetY = 0; }
    const resizeObserver = new ResizeObserver(() => { resize(); start(); });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    resizeObserver.observe(element);
    observer.observe(element);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', start);
    motion.addEventListener('change', start);
    resize();
    start();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', start);
      motion.removeEventListener('change', start);
    };
  }, []);

  return <div className="living-form"><canvas ref={canvas} role="img" aria-label="A flowing three-dimensional botanical form that turns with your cursor" /><div className="form-hint"><span /> Move your cursor. Find a new perspective.</div></div>;
}
