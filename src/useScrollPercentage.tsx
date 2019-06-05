import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from 'react'
import {
  calculateVerticalPercentage,
  calculateHorizontalPercentage,
} from './utils'
import { ScrollPercentageHookResponse, ScrollPercentageOptions } from './index'

/**
 * Create a hook that reports the percentage an element is scrolled into the viewport.
 * @param options {ScrollPercentageOptions}
 */
export function useScrollPercentage(
  options: ScrollPercentageOptions = {},
): ScrollPercentageHookResponse {
  const [ref, inView, entry] = useInView(options)
  const target = entry && entry.target
  const [percentage, setPercentage] = useState(0)

  const handleScroll = useCallback(() => {
    if (!target) return
    const percentage = options.horizontal
      ? calculateHorizontalPercentage(target, options.threshold, options.root)
      : calculateVerticalPercentage(target, options.threshold, options.root)

    setPercentage(percentage)
  }, [target, options.threshold, options.root, options.horizontal])

  const handleControlledScroll = useCallback(() => {
    if (!target) return

    const percentage = calculateVerticalPercentage(
      target,
      options.threshold,
      options.root,
      options.controlledScrollY,
    )

    setPercentage(percentage)

    return
  }, [target, options.threshold, options.root, options.controlledScrollY])

  useEffect(() => {
    if (inView) {
      const root = options.root || window

      if (options.controlledScroll) {
        return handleControlledScroll()
      }

      root.addEventListener('scroll', handleScroll, { passive: true })
      root.addEventListener('resize', handleScroll)

      // Trigger a scroll update, so we set the initial scroll percentage
      handleScroll()

      return () => {
        root.removeEventListener('scroll', handleScroll)
        root.removeEventListener('resize', handleScroll)
      }
    }
    return
  }, [
    inView,
    options.root,
    handleScroll,
    options.controlledScroll,
    handleControlledScroll,
  ])

  return [ref, percentage, entry]
}
