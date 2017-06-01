/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf, action } from '@storybook/react'
import ScrollPercentage from '../src/index'
import ScrollWrapper from './ScrollWrapper'

const Header = props => (
  <div
    style={{
      display: 'flex',
      minHeight: '25vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: 'lightcoral',
      color: 'azure',
    }}
  >
    <h2>{props.children}</h2>
  </div>
)

storiesOf('Scroll Percentage', module)
  .add('Child as function', () => (
    <ScrollWrapper>
      <ScrollPercentage>
        {({ percentage }) => (
          <Header
          >{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('With threshold', () => (
    <ScrollWrapper>
      <ScrollPercentage onChange={action('Scroll')} threshold={0.5}>
        {({ percentage }) => (
          <Header
          >{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</Header>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('onChange function', () => (
    <ScrollWrapper>
      <ScrollPercentage onChange={action('Scroll')}>
        <Header>Scroll percentage dispatched</Header>
      </ScrollPercentage>
    </ScrollWrapper>
  ))
