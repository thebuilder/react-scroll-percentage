import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ScrollPercentage from '../src/index'
import ScrollWrapper from './ScrollWrapper'

storiesOf('Scroll Percentage', module)
  .add('Child as function', () => (
    <ScrollWrapper>
      <ScrollPercentage>
        {({ percentage }) => (
          <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('With threshold', () => (
    <ScrollWrapper>
      <ScrollPercentage onChange={action('Scroll')} threshold={0.5}>
        {({ percentage }) => (
          <h2>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</h2>
        )}
      </ScrollPercentage>
    </ScrollWrapper>
  ))
  .add('onChange function', () => (
    <ScrollWrapper>
      <ScrollPercentage onChange={action('Scroll')}>
        <h2>Scroll percentage dispatched</h2>
      </ScrollPercentage>
    </ScrollWrapper>
  ))
