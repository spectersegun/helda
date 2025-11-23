// utils/animateFlyTo.ts
export async function animateFlyTo(
  sourceEl: HTMLElement,
  destRect: DOMRect,
  opts?: { duration?: number; easing?: string }
) {
  const duration = opts?.duration ?? 520;
  const easing = opts?.easing ?? "cubic-bezier(.2,.9,.2,1)";

  // Clone the source element visually
  const clone = sourceEl.cloneNode(true) as HTMLElement;
  const sourceRect = sourceEl.getBoundingClientRect();

  // Basic clone styles
  clone.style.position = "fixed";
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.style.margin = "0";
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  clone.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
  // preserve font/appearance
  clone.style.background =
    window.getComputedStyle(sourceEl).background || "transparent";
  clone.style.color = window.getComputedStyle(sourceEl).color || "inherit";

  document.body.appendChild(clone);

  // Calculate translate deltas (center align)
  const deltaX = destRect.left - sourceRect.left;
  const deltaY = destRect.top - sourceRect.top;

  // slight scale down/up for effect (optional)
  const scale = Math.min(1, destRect.width / sourceRect.width);

  // Force reflow then start the animation
  void clone.offsetHeight;
  clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
  clone.style.opacity = "0.95";

  // Wait for animation end
  await new Promise((resolve) => {
    const handle = () => {
      clone.removeEventListener("transitionend", handle);
      resolve(true);
    };
    clone.addEventListener("transitionend", handle);
    // fallback timeout
    setTimeout(() => {
      try {
        clone.remove();
      } catch {}
      resolve(true);
    }, duration + 80);
  });

  // remove clone if still present
  if (clone.parentElement) clone.parentElement.removeChild(clone);
}
