import * as React from 'react'
import InView, {
  IntersectionObserverProps,
  PlainChildrenProps,
} from 'react-intersection-observer'

type State = {
  percentage: number
  inView: boolean,
  entry?: IntersectionObserverEntry
}

function isPlainChildren(
  props: IntersectionObserverProps | PlainChildrenProps,
): props is PlainChildrenProps {
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
  IntersectionObserverProps | PlainChildrenProps,
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

  handleInView = (inView:boolean, entry: IntersectionObserverEntry) => {
    this.setState({ entry, inView })
  }

  render() {
    const { percentage, entry } = this.state

    return (
      <InView
        {...this.props}
        onChange={this.handleInView}
        ref={this.handleNode}
      >
        {!isPlainChildren(this.props)
          ? this.props.children({ percentage, entry, ref: this.handleNode })
          : this.props.children}
      </InView>
    )
  }
}
