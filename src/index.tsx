import { ScrollPercentage } from './ScrollPercentage'
import * as React from 'react'

export { ScrollPercentage } from './ScrollPercentage'
export { useScrollPercentage } from './useScrollPercentage'

export default ScrollPercentage

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

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
  horizontal?: boolean,
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
export type ScrollPercentagePlainChildrenProps = ScrollPercentageProps & {
  children: React.ReactNode

  /**
   * Render the wrapping element as this element.
   * @default `'div'`
   */
  as?: React.ReactType<any>

  /**
   * Element tag to use for the wrapping component
   * @deprecated Replace with the 'as' prop
   */
  tag?: React.ReactType<any>

  /** Call this function whenever the in view state changes */
  onChange?: (percentage: number, entry: IntersectionObserverEntry) => void
} & Omit<React.HTMLProps<HTMLElement>, 'onChange'>
