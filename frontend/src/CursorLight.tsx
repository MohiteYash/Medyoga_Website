import { useEffect, useRef } from 'react';

export default function CursorLight() {
  const light = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const enabled = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let card: HTMLElement | null = null;
    function reset() {
      card?.style.removeProperty('transform');
      card = null;
      light.current?.classList.remove('is-visible');
    }
    function move(event: PointerEvent) {
      if (!enabled.matches || event.pointerType !== 'mouse') { reset(); return; }
      const target = event.target instanceof Element ? event.target : null;
      const next = target?.closest<HTMLElement>('.pathway-card, .training-details, .journal-links > a') ?? null;
      if (next !== card) card?.style.removeProperty('transform');
      card = next;
      if (card) {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty('--hover-x', `${x * 100}%`);
        card.style.setProperty('--hover-y', `${y * 100}%`);
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 7}deg)`;
      }
      light.current?.style.setProperty('--cursor-x', `${event.clientX}px`);
      light.current?.style.setProperty('--cursor-y', `${event.clientY}px`);
      light.current?.classList.add('is-visible');
      light.current?.classList.toggle('is-hovering', Boolean(target?.closest('a,button')));
    }
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    enabled.addEventListener('change', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
      enabled.removeEventListener('change', reset);
      reset();
    };
  }, []);
  return <div className="cursor-light" ref={light} aria-hidden="true"><span /></div>;
}
