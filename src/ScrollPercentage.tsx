import * as React from 'react'
import InView from 'react-intersection-observer'
import { watchScroll } from './scroll'
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

    if (prevState.inView !== this.state.inView) {
      watchScroll(this.handleScroll, this.state.inView)
    }
  }

  componentWillUnmount(): void {
    watchScroll(this.handleScroll, false)
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
