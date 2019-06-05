/*
 * Helpers
 */

function getScrollPercentage(
  upper: number,
  inner: number,
  threshold: number = 0,
  scrollY: number = 0,
  frame: number = 0,
) {
  const thresholdOffset = threshold * inner

  const top = upper - frame + thresholdOffset
  const bottom = upper + inner - thresholdOffset
  const percentage = (scrollY - top) / (bottom - top)

  return Math.max(0, Math.min(1, percentage))
}

/*
 * Export functions
 */

export function calculateVerticalPercentage(
  node: HTMLDivElement,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
  scrollY?: number | boolean | null | undefined,
) {
  if (!root) return 0

  const vh =
    (root instanceof Element ? root.clientHeight : root.innerHeight) || 0

  if (typeof scrollY !== 'number') {
    scrollY = (root instanceof Element ? root.scrollTop : root.scrollY) || 0
  }

  return getScrollPercentage(
    node.offsetTop,
    node.offsetHeight,
    threshold,
    scrollY,
    vh,
  )
}

export function calculateHorizontalPercentage(
  node: HTMLDivElement,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
  scrollX?: number | boolean | null | undefined,
) {
  if (!root) return 0
  const vw = (root instanceof Element ? root.clientWidth : root.innerWidth) || 0

  if (typeof scrollX !== 'number') {
    scrollX = (root instanceof Element ? root.scrollLeft : root.scrollX) || 0
  }

  return getScrollPercentage(
    node.offsetLeft,
    node.offsetWidth,
    threshold,
    scrollX,
    vw,
  )
}
