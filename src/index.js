// @flow
import * as React from 'react' // eslint-disable-line no-unused-vars
import Observer from 'react-intersection-observer'
import { unwatch, watch } from './scroll'

type Props = {
  /** Element tag to use for the wrapping */
  tag: string,
  /** Children should be either a function or a node */
  children?: React.Node | ((percentage: number, inView: boolean) => React.Node),
  /** Call this function whenever the percentage changes */
  onChange?: (percentage: number, inView: boolean) => void,
  /** Number between 0 and 1 indicating the the percentage that should be visible before triggering */
  threshold: number,
}

type State = {
  percentage: number,
  inView: boolean,
}

/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <ScrollPercentage>
 {({inView, percentage}) => (
   <h1>{`${inView} {percentage}`}</h1>
 )}
 </ScrollPercentage>
 */
class ScrollPercentage extends React.PureComponent<Props, State> {
  static defaultProps = {
    tag: 'div',
    threshold: 0,
  }

  /**
   * Get the correct viewport height. If rendered inside an iframe, grab it from the parent
   */
  static viewportHeight(): number {
    return global.parent ? global.parent.innerHeight : global.innerHeight || 0
  }

  static calculatePercentage(
    height: number,
    bottom: number,
    threshold: number = 0,
  ): number {
    const vh = ScrollPercentage.viewportHeight()
    const offsetTop = threshold * vh * 0.25
    const offsetBottom = threshold * vh * 0.25

    return (
      1 -
      Math.max(
        0,
        Math.min(
          1,
          (bottom - offsetTop) / (vh + height - offsetBottom - offsetTop),
        ),
      )
    )
  }

  state = {
    percentage: 0,
    inView: false,
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (!nextProps.onChange) return
    if (
      nextState.percentage !== this.state.percentage ||
      nextState.inView !== this.state.inView
    ) {
      nextProps.onChange(nextState.percentage, nextState.inView)
    }
  }

  componentDidMount() {
    // Start by updating the scroll position, so it correctly reflects the elements start position
    this.handleScroll()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.inView !== this.state.inView) {
      this.monitorScroll(this.state.inView)
    }
  }

  componentWillUnmount() {
    this.monitorScroll(false)
    this.observer = null
  }

  observer: ?Observer = null

  monitorScroll(enable: boolean) {
    if (enable) {
      watch(this.handleScroll)
    } else {
      unwatch(this.handleScroll)
    }
  }

  handleInView = (inView: boolean) => {
    this.setState({ inView })
  }

  handleNode = (node: ?Observer) => (this.observer = node)

  handleScroll = () => {
    if (!this.observer || !this.observer.node) return
    const { threshold } = this.props
    const { bottom, height } = this.observer.node.getBoundingClientRect()
    const percentage = ScrollPercentage.calculatePercentage(
      height,
      bottom,
      threshold,
    )

    if (percentage !== this.state.percentage) {
      this.setState({
        percentage,
      })
    }
  }

  render() {
    const { children, threshold, ...props } = this.props

    return (
      <Observer ref={this.handleNode} {...props} onChange={this.handleInView}>
        {children && typeof children === 'function'
          ? children(this.state.percentage, this.state.inView)
          : children}
      </Observer>
    )
  }
}

export default ScrollPercentage
