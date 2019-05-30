import * as React from 'react'
import styled from 'styled-components'

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

type Props = {
  children: React.ReactNode
  horizontal?: boolean
}

/**
 * ScrollWrapper directs the user to scroll the page to reveal it's children.
 * Use this on Modules that have scroll and/or observer triggers.
 */
function ScrollWrapper({ children, horizontal }: Props) {
  return horizontal ? (
    <Horizontal>
      <ScrollBlock>
        <h1>
          Scroll right{' '}
          <span role="img" aria-label="Point right">
            👉
          </span>
        </h1>
      </ScrollBlock>
      {children}
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
    <>
      <ScrollBlock>
        <h1>
          Scroll down{' '}
          <span role="img" aria-label="Point down">
            👇
          </span>
        </h1>
      </ScrollBlock>
      {children}
      <ScrollBlock>
        <h1>
          Scroll up{' '}
          <span role="img" aria-label="Point up">
            👆
          </span>
        </h1>
      </ScrollBlock>
    </>
  )
}

export default ScrollWrapper
