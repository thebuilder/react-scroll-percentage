import { Component, ReactNode } from 'react'

interface ScrollPercentageProps {
  tag?: string
  children: (renderProps: { percentage: number; inView: boolean }) => ReactNode
  threshold?: number
  onChange?: (percentage: number, inView: boolean) => void
  innerRef?: (elememnt?: HTMLElement) => void
}

export default class ScrollPercentage extends Component<
  ScrollPercentageProps
> {}
