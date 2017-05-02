import React, { PureComponent } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import Observer from 'react-intersection-observer'

const isFunction = func => typeof func === 'function'

/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <ScrollPercentage>
 {({inView, percentage}) => (
   <h1>{`${inView} {percentage}`}</h1>
 )}
 </ScrollPercentage>
 */
class ScrollPercentage extends PureComponent {
  static propTypes = {
    /** Element tag to use for the wrapping */
    tag: PropTypes.node,
    /** Children should be either a function or a node */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Call this function whenever the percentage changes */
    onChange: PropTypes.func,
    /** Number between 0 and 1 indicating the the percentage that should be visible before triggering */
    threshold: PropTypes.number,
  }

  static defaultProps = {
    tag: 'div',
    threshold: 0,
  }

  /**
   * Get the correct viewport height. If rendered inside an iframe, grab it from the parent
   */
  static viewportHeight() {
    return global.parent ? global.parent.innerHeight : global.innerHeight
  }

  static calculatePercentage(height, bottom, threshold = 0) {
    const vh = ScrollPercentage.viewportHeight()
    const offsetTop = threshold * vh * 0.5
    const offsetBottom = threshold * vh * 0.5

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

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.onChange) return
    if ((nextState.percentage !== this.state.percentage || nextState.inView !== this.state.inView)) {
      nextProps.onChange({ ...this.state })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inView !== this.state.inView) {
      this.monitorScroll(this.state.inView)
    }
  }

  componentWillUnmount() {
    this.monitorScroll(false)
    this.observer = null
  }

  observer = null

  monitorScroll(enable) {
    if (enable) {
      window.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    } else {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleChange = inView => {
    this.setState({ inView })
  }

  handleNode = node => (this.observer = node)
  handleScroll = () => requestAnimationFrame(() => this.updatePercentage())

  updatePercentage() {
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

    return React.createElement(
      Observer,
      {
        ...props,
        onChange: this.handleChange,
        ref: this.handleNode,
      },
      // If children is a function, render it with the current percentage and inView status.
      // Otherwise always render children. Assume onChange is being used outside, to control the the state of children.
      isFunction(children)
        ? children({
            percentage: this.state.percentage,
            inView: this.state.inView,
          })
        : children,
    )
  }
}

export default ScrollPercentage
