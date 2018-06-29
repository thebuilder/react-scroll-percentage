// @flow
import * as React from 'react' // eslint-disable-line no-unused-vars
import Observer from 'react-intersection-observer'
import { unwatch, watch } from './scroll'
import invariant from 'invariant'

type InnerCallback = {
  inView: boolean,
  ref: (node: ?HTMLElement) => void,
}

type Props = {
  /** Children should be either a function or a node */
  children:
    | React.Node
    | (({
        percentage: number,
        inView: boolean,
      }) => React.Node),
  /** Call this function whenever the percentage changes */
  onChange?: (percentage: number, inView: boolean) => void,
  /** Number between 0 and 1 indicating the the percentage that should be visible before triggering */
  threshold?: number,
  /** Element to use for wrapping element. Defaults to a `<div>` */
  tag?: string,
  /** Get a reference to the the inner DOM node */
  innerRef?: (element: ?HTMLElement) => void,
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
    bounds: ClientRect,
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
          (bounds.bottom - offsetTop) /
            (vh + bounds.height - offsetBottom - offsetTop),
        ),
      )
    )
  }

  state = {
    percentage: 0,
    inView: false,
  }

  componentDidMount() {
    // Start by updating the scroll position, so it correctly reflects the elements start position
    this.handleScroll()

    if (process.env.NODE_ENV !== 'production') {
      invariant(
        this.node,
        `react-scroll-percentage: No DOM node found. Make sure you forward "ref" to the root DOM element you want to observe, when using render prop.`,
      )
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.props.onChange &&
      (prevState.percentage !== this.state.percentage ||
        prevState.inView !== this.state.inView)
    ) {
      this.props.onChange(this.state.percentage, this.state.inView)
    }

    if (prevState.inView !== this.state.inView) {
      this.monitorScroll(this.state.inView)
    }
  }

  componentWillUnmount() {
    this.monitorScroll(false)
  }

  node: ?HTMLElement = null

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

  handleNode = (observer: ?Observer) => (this.node = observer && observer.node)

  handleScroll = () => {
    if (!this.node) return
    const { threshold } = this.props
    const bounds = this.node.getBoundingClientRect()
    const percentage = ScrollPercentage.calculatePercentage(bounds, threshold)

    if (percentage !== this.state.percentage) {
      this.setState({
        percentage,
      })
    }
  }

  renderInner = ({ inView, ref }: InnerCallback) => {
    const {
      children,
      onChange,
      threshold,
      innerRef,
      tag,
      ...props
    } = this.props

    // Create a wrapping element
    return React.createElement(
      tag || 'div',
      {
        ref: innerRef
          ? node => {
              innerRef(node)
              ref(node)
            }
          : ref,
        ...props,
      },
      typeof children === 'function'
        ? children({ percentage: this.state.percentage, inView })
        : children,
    )
  }

  render() {
    return (
      <Observer
        onChange={this.handleInView}
        threshold={this.props.threshold}
        ref={this.handleNode}
      >
        {this.renderInner}
      </Observer>
    )
  }
}

export default ScrollPercentage
