import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ScrollPercentage } from '../src'
import ScrollWrapper from './ScrollWrapper'
import VirtualScrollWrapper from './VirtualScrollWrapper'
import Status from './Status'

const calcPercentage = (percentage: number) => Math.floor(percentage * 100)

type Props = {
  style?: Object
  children?: React.ReactNode
  threshold?: number
  percentage?: number
}

// $FlowFixMe forwardRef is not known by Flow
const Header = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
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
    {props.percentage !== undefined ? (
      <Status percentage={props.percentage} />
    ) : null}
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
          <Header
            ref={ref}
            percentage={percentage}
          >{`Percentage scrolled: ${calcPercentage(percentage)}%.`}</Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('Taller then viewport', () => (
    <ScrollWrapper>
      <ScrollPercentage>
        {({ percentage, ref }) => (
          <Header
            ref={ref}
            style={{ height: '150vh' }}
            percentage={percentage}
          >{`Percentage scrolled: ${calcPercentage(percentage)}%.`}</Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('With threshold', () => (
    <ScrollWrapper>
      <ScrollPercentage threshold={0}>
        {({ percentage, ref }) => (
          <Header ref={ref} threshold={0}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={0.25}>
        {({ percentage, ref }) => (
          <Header ref={ref} style={{ background: 'slategrey' }} threshold={25}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={0.5}>
        {({ percentage, ref }) => (
          <Header ref={ref} style={{ background: 'plum' }} threshold={50}>
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={0.75}>
        {({ percentage, ref }) => (
          <Header
            ref={ref}
            style={{ background: 'lightseagreen' }}
            threshold={75}
          >
            {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
          </Header>
        )}
      </ScrollPercentage>
      <ScrollPercentage threshold={1}>
        {({ percentage, ref }) => (
          <Header
            ref={ref}
            style={{ background: 'cornflowerblue' }}
            threshold={100}
          >
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
  .add('Virtual scroll', () => (
    <VirtualScrollWrapper>
      {scrollY => (
        <ScrollPercentage controlledScroll={true} controlledScrollY={scrollY}>
          {({ percentage, ref }) => (
            <Header ref={ref}>
              <Status
                percentage={percentage}
                style={{
                  transform: `translate3d( 0, ${scrollY}px, 0)`,
                }}
              />
              {`Percentage scrolled: ${calcPercentage(percentage)}%.`}
            </Header>
          )}
        </ScrollPercentage>
      )}
    </VirtualScrollWrapper>
  ))
