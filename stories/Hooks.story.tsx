import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'
import { ScrollPercentageOptions, useScrollPercentage } from '../src'
import { number, withKnobs } from '@storybook/addon-knobs'
import ScrollWrapper from './ScrollWrapper'

type Props = {
  options?: ScrollPercentageOptions
  horizontal?: boolean
}

function getOptions(options: ScrollPercentageOptions = { threshold: 0 }) {
  const { threshold } = options
  return {
    ...options,
    threshold: number('Threshold', (threshold as number) || 0, {
      range: true,
      min: 0,
      max: 1,
      step: 0.1,
    }),
  }
}

const Content = styled.div`
  background: #148bb4;
  color: azure;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 1em;
  min-width: 20vw;
  font-size: 2rem;
  flex: 1 1 auto;
`

const HookComponent = (props: Props) => {
  const [ref, percentage] = useScrollPercentage(getOptions(props.options))

  useEffect(() => {
    const debounced = setTimeout(() => {
      action('scroll')(percentage * 100)
    }, 50)

    return () => {
      clearTimeout(debounced)
    }
  }, [percentage])

  return (
    <Content ref={ref}>
      <code>Percentage: {Math.floor(percentage * 100)}%</code>
    </Content>
  )
}

storiesOf('useScrollPercentage', module)
  .addDecorator(withKnobs)
  .add('Example vertical', () => (
    <ScrollWrapper>
      <HookComponent />
    </ScrollWrapper>
  ))
  .add('Example horizontal', () => (
    <ScrollWrapper horizontal>
      <HookComponent options={{ horizontal: true }} />
    </ScrollWrapper>
  ))
