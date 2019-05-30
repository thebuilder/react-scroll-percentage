import * as React from 'react'
import { ScrollPercentage } from './ScrollPercentage'

export { ScrollPercentage } from './ScrollPercentage'
export { useScrollPercentage } from './useScrollPercentage'

export default ScrollPercentage

interface RenderProps {
  percentage: number
  inView: boolean
  entry: IntersectionObserverEntry | undefined
  ref: React.RefObject<any> | ((node?: Element | null) => void)
}

export interface ScrollPercentageOptions extends IntersectionObserverInit {
  /** Number between 0 and 1 indicating the the percentage that should be visible before triggering */
  threshold?: number
  /** Horizontal scroll mode (true/false) */
  horizontal?: boolean
}

export interface ScrollPercentageProps extends ScrollPercentageOptions {
  /**
   * Children expects a function that receives an object
   * contain an `inView` boolean and `ref` that should be
   * assigned to the element root.
   */
  children: (fields: RenderProps) => React.ReactNode

  /** Call this function whenever the in view state changes */
  onChange?: (percentage: number, entry?: IntersectionObserverEntry) => void
}

/**
 * Types specific to the PlainChildren rendering of InView
 * */
export interface ScrollPercentagePlainChildrenProps
  extends ScrollPercentageOptions {
  children: React.ReactNode

  /**
   * Render the wrapping element as this element.
   * @default `'div'`
   */
  as?: React.ReactType<any>

  /** Call this function whenever the in view state changes */
  onChange?: (percentage: number, entry?: IntersectionObserverEntry) => void
}

export type ScrollPercentageHookResponse = [
  ((node?: Element | null) => void),
  number,
  IntersectionObserverEntry | undefined
]
