import * as React from 'react'
import styled from 'styled-components'
import { NumberTypeAnnotation } from '@babel/types'

const ScrollElement = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const ScrollBlock = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d1176;
  color: white;
`

const Horizontal = styled.div`
  width: 300vw;
  display: flex;
`

interface RenderProps {
  scrollY: number
}

type State = {
  scrollY: number
}

interface Props {
  horizontal: boolean
  children: (fields: RenderProps) => React.ReactNode
}

/**
 * VirtualScrollWrapper directs the user to scroll the page to reveal it's children.
 * Use this on Modules that have scroll and/or observer triggers.
 */
class VirtualScrollWrapper extends React.PureComponent<Props, State> {
  scrollElement: HTMLDivElement | null | false | undefined

  state = {
    scrollY: 0,
  }

  onWheel = ({ deltaY = 0 }: WheelEvent) => {
    if (!this.scrollElement) return
    const scrollY = this.state.scrollY + deltaY

    return this.setState({
      scrollY: Math.max(
        0,
        Math.min(this.scrollElement.offsetHeight - window.innerHeight, scrollY),
      ),
    })
  }

  render() {
    return this.props.horizontal ? (
      <Horizontal>
        <ScrollBlock>
          <h1>
            Scroll right{' '}
            <span role="img" aria-label="Point right">
              👉
            </span>
          </h1>
        </ScrollBlock>
        {this.props.children(this.state.scrollY)}
        <ScrollBlock>
          <h1>
            Scroll left{' '}
            <span role="img" aria-label="Point left">
              👈
            </span>
          </h1>
        </ScrollBlock>
      </Horizontal>
    ) : (
      <ScrollElement onWheel={this.onWheel}>
        <div
          ref={el => (this.scrollElement = el)}
          style={{
            transform: `translate3d( 0, -${this.state.scrollY}px, 0)`,
          }}
        >
          <ScrollBlock>
            <h1>
              Scroll down{' '}
              <span role="img" aria-label="Point down">
                👇
              </span>
            </h1>
          </ScrollBlock>
          {this.props.children(this.state.scrollY)}
          <ScrollBlock>
            <h1>
              Scroll up{' '}
              <span role="img" aria-label="Point up">
                👆
              </span>
            </h1>
          </ScrollBlock>
        </div>
      </ScrollElement>
    )
  }
}

export default VirtualScrollWrapper
