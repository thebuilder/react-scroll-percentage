import React from 'react'
import { shallow } from 'enzyme'
import ScrollPercentage from '../src/index.js'

jest.mock('react-intersection-observer')

beforeEach(() => {
  global.innerHeight = 800
})

afterEach(() => {
  global.innerHeight = 800
})

it('Should render <ScrollPercentage />', () => {
  const callback = jest.fn()
  shallow(
    <ScrollPercentage>
      {callback}
    </ScrollPercentage>,
  )
  expect(callback).toHaveBeenCalled()
})

it('Should render with child', () => {
  shallow(
    <ScrollPercentage>
      <div />
    </ScrollPercentage>,
  )
})

it('Should return a percentage', () => {
  expect(ScrollPercentage.calculatePercentage(250, 0)).toEqual(1)
  expect(ScrollPercentage.calculatePercentage(250, 1050)).toEqual(0)
})

it('Should handle threshold', () => {
  // 525 is half of 1050 - the full bottom size
  expect(ScrollPercentage.calculatePercentage(250, 525, 0.1)).toEqual(0.5)
})
