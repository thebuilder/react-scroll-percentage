export function calculateVerticalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
) {
  if (!root) return 0
  const vh =
    (root instanceof Element ? root.clientHeight : root.innerHeight) || 0
  const offset = threshold * vh
  const percentage =
    (bounds.bottom - offset) / (vh + bounds.height - offset * 2)

  return 1 - Math.max(0, Math.min(1, percentage))
}

export function calculateHorizontalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
) {
  if (!root) return 0
  const vw = (root instanceof Element ? root.clientWidth : root.innerWidth) || 0
  const offset = threshold * vw
  const percentage = (bounds.right - offset) / (vw + bounds.width - offset * 2)

  return 1 - Math.max(0, Math.min(1, percentage))
}
