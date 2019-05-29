import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from 'react'
import {
  calculateVerticalPercentage,
  calculateHorizontalPercentage,
} from './utils'
import { ScrollPercentageOptions } from './index'

type HookResponse = [((node?: Element | null) => void), number]

/**
 * Create a hook that reports the percentage an element is scrolled into the viewport.
 * @param options {ScrollPercentageOptions}
 */
export function useScrollPercentage(
  options: ScrollPercentageOptions = {},
): HookResponse {
  const [ref, inView, entry] = useInView(options)
  const target = entry && entry.target
  const [percentage, setPercentage] = useState(0)

  const handleScroll = useCallback(() => {
    if (!target) return
    const bounds = target.getBoundingClientRect()
    const percentage = options.horizontal
      ? calculateHorizontalPercentage(bounds, options.threshold, options.root)
      : calculateVerticalPercentage(bounds, options.threshold, options.root)

    setPercentage(percentage)
  }, [target, options.threshold, options.root, options.horizontal])

  useEffect(() => {
    if (inView) {
      const root = options.root || window
      root.addEventListener('scroll', handleScroll, { passive: true })

      // Trigger a scroll update, so we set the initial scroll percentage
      handleScroll()

      return () => {
        root.removeEventListener('scroll', handleScroll)
      }
    }
    return
  }, [inView, options.root, handleScroll])

  return [ref, percentage]
}
