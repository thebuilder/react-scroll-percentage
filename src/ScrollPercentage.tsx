import * as React from 'react'
import InView from 'react-intersection-observer'
import {
  calculateHorizontalPercentage,
  calculateVerticalPercentage,
} from './utils'
import {
  ScrollPercentagePlainChildrenProps,
  ScrollPercentageProps,
} from './index'

type State = {
  percentage: number
  inView: boolean
  entry?: IntersectionObserverEntry
}

type RenderProps = {
  ref: React.RefObject<any> | ((node?: Element | null) => void)
}

function isPlainChildren(
  props: ScrollPercentageProps | ScrollPercentagePlainChildrenProps,
): props is ScrollPercentagePlainChildrenProps {
  return typeof props.children !== 'function'
}

/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <ScrollPercentage>
 {({ref, percentage}) => (
   <h1 ref={ref}>{`${percentage}`}</h1>
 )}
 </ScrollPercentage>
 */
export class ScrollPercentage extends React.Component<
  ScrollPercentageProps | ScrollPercentagePlainChildrenProps,
  State
> {
  static displayName = 'ScrollPercentage'
  static defaultProps = {
    threshold: 0,
  }

  state: State = {
    percentage: 0,
    inView: false,
    entry: undefined,
  }

  node?: Element | null = undefined
  monitoring: boolean = false

  componentDidUpdate(
    prevProps: ScrollPercentageProps | ScrollPercentagePlainChildrenProps,
    prevState: State,
  ) {
    if (
      this.props.onChange &&
      (prevState.percentage !== this.state.percentage ||
        prevState.inView !== this.state.inView)
    ) {
      this.props.onChange(this.state.percentage, this.state.entry)
    }

    if (prevProps.root !== this.props.root) {
      if (this.monitoring) {
        this.monitorScroll(false, prevProps.root)
        this.monitorScroll(this.state.inView)
      }
    }

    if (prevState.inView !== this.state.inView) {
      this.monitorScroll(this.state.inView, prevProps.root)
    }
  }

  componentWillUnmount(): void {
    this.monitorScroll(false)
  }

  monitorScroll(enabled: boolean, target?: Element | Window | null) {
    const root = target || this.props.root || window

    if (enabled) {
      if (this.monitoring) return
      root.addEventListener('scroll', this.handleScroll, { passive: true })
      root.addEventListener('resize', this.handleScroll)
      this.handleScroll()
      this.monitoring = true
    } else {
      if (!this.monitoring) return
      root.removeEventListener('scroll', this.handleScroll)
      root.removeEventListener('resize', this.handleScroll)
      this.monitoring = false
    }
  }

  handleScroll = () => {
    if (!this.node) return
    const bounds = this.node.getBoundingClientRect()
    const percentage = this.props.horizontal
      ? calculateHorizontalPercentage(
          bounds,
          this.props.threshold,
          this.props.root,
        )
      : calculateVerticalPercentage(
          bounds,
          this.props.threshold,
          this.props.root,
        )
    if (percentage !== this.state.percentage) {
      this.setState({
        percentage,
      })
    }
  }

  handleInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    this.node = entry.target
    this.setState({ entry, inView })
  }

  handleRenderProps = ({ ref }: RenderProps) => {
    const { percentage, entry, inView } = this.state
    if (!isPlainChildren(this.props)) {
      return this.props.children({
        percentage,
        entry,
        inView,
        ref,
      })
    }

    return null
  }

  render() {
    return (
      <InView onChange={this.handleInView}>
        {!isPlainChildren(this.props)
          ? this.handleRenderProps
          : this.props.children}
      </InView>
    )
  }
}
