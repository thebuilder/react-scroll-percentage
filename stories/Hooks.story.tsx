import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { useScrollPercentage } from '../src/useScrollPercentage'
import ScrollWrapper from './ScrollWrapper/index'
import { CSSProperties } from 'react'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'
import { IntersectionOptions } from 'react-intersection-observer/dist/typings/types'

type Props = {
  style?: Object
  children?: React.ReactNode
  options?: IntersectionOptions
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

function getOptions(
  options: IntersectionOptions = { threshold: 0, triggerOnce: false },
) {
  const { threshold, triggerOnce } = options
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
    triggerOnce: boolean('Trigger once', triggerOnce || false),
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

storiesOf('useInView hook', module)
  .addDecorator(withKnobs)

  .add('Basic', () => (
    <ScrollWrapper>
      <HookComponent />
    </ScrollWrapper>
  ))
