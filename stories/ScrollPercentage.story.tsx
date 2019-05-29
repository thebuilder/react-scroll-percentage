// @flow
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ScrollPercentage } from '../src/ScrollPercentage'
import ScrollWrapper from './ScrollWrapper'

const calcPercentage = (percentage: number) => Math.floor(percentage * 100)

type Props = {
  style?: Object
  children?: React.ReactNode
  threshold?: number
}

// $FlowFixMe forwardRef is not known by Flow
const Header = React.forwardRef((props: Props, ref: any) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      minHeight: '25vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: 'lightcoral',
      color: 'azure',
      ...props.style,
    }}
  >
    {props.threshold ? (
      <h2
        style={{ marginTop: 0 }}
      >{`Threshold: ${props.threshold.toString()}%`}</h2>
    ) : null}
    <h3 style={{ marginBottom: 0 }}>{props.children}</h3>
  </div>
))

storiesOf('Scroll Percentage', module)
  .add('Child as function', () => (
    <ScrollWrapper>
      <ScrollPercentage>
        {({ percentage, ref }) => (
          <Header ref={ref}>{`Percentage scrolled: ${calcPercentage(
            percentage,
          )}%.`}</Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('Taller then viewport', () => (
    <ScrollWrapper>
      <ScrollPercentage>
        {({ percentage }) => (
          <Header
            style={{ height: '150vh' }}
          >{`Percentage scrolled: ${calcPercentage(percentage)}%.`}</Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('With threshold', () => (
    <ScrollWrapper>
      <ScrollPercentage threshold={0}>
        {({ percentage }) => (
          <Header threshold={0}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={0.25}>
        {({ percentage }) => (
          <Header style={{ background: 'slategrey' }} threshold={25}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={0.5}>
        {({ percentage }) => (
          <Header style={{ background: 'plum' }} threshold={50}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={0.75}>
        {({ percentage }) => (
          <Header style={{ background: 'lightseagreen' }} threshold={75}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={1}>
        {({ percentage }) => (
          <Header style={{ background: 'cornflowerblue' }} threshold={100}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('onChange function', () => (
    <ScrollWrapper>
      <ScrollPercentage onChange={action('Scroll')}>
        <Header>
          Scroll percentage dispatched to <em>onChange</em>
        </Header>
      </ScrollPercentage>
    </ScrollWrapper>
  ))
