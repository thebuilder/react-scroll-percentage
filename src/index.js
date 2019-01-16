// @flow
import * as React from 'react' // eslint-disable-line no-unused-vars
import InView from 'react-intersection-observer'
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
  /** Horizontal scroll mode (true/false) */
  horizontal?: boolean,
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

  /**
   * Get the correct viewport width for horizontal mode. If rendered inside an iframe, grab it from the parent
   */
  static viewportWidth(): number {
    return global.parent ? global.parent.innerWidth : global.innerWidth || 0
  }

  static calculatePercentage(
    bounds: ClientRect,
    threshold: number = 0,
    horizontal: boolean = false,
  ): number {
    // For horizontal mode use width and left/right for calculations
    if (horizontal) {
      const vw = ScrollPercentage.viewportWidth()
      const offsetLeft = threshold * vw * 0.25
      const offsetRight = threshold * vw * 0.25

      return (
        1 -
        Math.max(
          0,
          Math.min(
            1,
            (bounds.left - offsetLeft) /
              (vw + bounds.width - offsetRight - offsetLeft),
          ),
        )
      )
    }

    // For vertical mode use height and top/bottom for calculations
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

  handleNode = (observer: ?InView) => (this.node = observer && observer.node)

  handleScroll = () => {
    if (!this.node) return
    const { threshold, horizontal } = this.props
    const bounds = this.node.getBoundingClientRect()
    const percentage = ScrollPercentage.calculatePercentage(
      bounds,
      threshold,
      horizontal,
    )

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
      <InView
        onChange={this.handleInView}
        threshold={this.props.threshold}
        ref={this.handleNode}
      >
        {this.renderInner}
      </InView>
    )
  }
}

export default ScrollPercentage
