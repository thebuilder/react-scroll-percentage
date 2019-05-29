import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { useScrollPercentage, ScrollPercentageOptions } from '../src'
import ScrollWrapper from './ScrollWrapper/index'
import { CSSProperties } from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'

type Props = {
  style?: Object
  children?: React.ReactNode
  options?: ScrollPercentageOptions
}

const sharedStyle: CSSProperties = {
  display: 'flex',
  minHeight: '25vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  background: '#148bb4',
  color: 'azure',
}

function getOptions(options: ScrollPercentageOptions = { threshold: 0 }) {
  const { threshold } = options
  return {
    ...options,
    threshold:
      options && Array.isArray(threshold)
        ? threshold
        : number('Threshold', (threshold as number) || 0, {
            range: true,
            min: 0,
            max: 1,
            step: 0.1,
          }),
  }
}

const HookComponent = ({ options, style, children, ...rest }: Props) => {
  const [ref, percentage] = useScrollPercentage(getOptions(options))

  return (
    <div ref={ref} style={{ ...sharedStyle, ...style }} {...rest}>
      <h2>{percentage}</h2>
    </div>
  )
}

storiesOf('useScrollPercentage hook', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <ScrollWrapper>
      <HookComponent />
    </ScrollWrapper>
  ))
