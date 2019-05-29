import { renderHook } from 'react-hooks-testing-library'
import { useScrollPercentage } from '../src/useScrollPercentage'
import {
  calculateHorizontalPercentage,
  calculateVerticalPercentage,
} from '../src/utils'

it('should execute the useScrollPercentage hook', () => {
  const { result } = renderHook(() => useScrollPercentage())
  const [ref, percentage] = result.current
  expect(percentage).toBe(0)

  // This test should be expanded upon. Needs to handle both intersection observer and scrolling updates.
})

describe('scroll calculations', () => {
  beforeEach(() => {
    window.innerHeight = 800
    window.innerWidth = 800
  })

  it('Should return a percentage', () => {
    expect(calculateVerticalPercentage({ height: 250, bottom: 0 }, 0)).toEqual(
      1,
    )
    expect(
      calculateVerticalPercentage({ height: 250, bottom: 1050 }, 0),
    ).toEqual(0)
  })

  it('Should handle threshold', () => {
    // 525 is half of 1050 - the full bottom size
    expect(
      calculateVerticalPercentage({ height: 250, bottom: 525 }, 0.1),
    ).toEqual(0.5)
  })

  it('Should return a horizontal percentage', () => {
    expect(calculateHorizontalPercentage({ right: 0, width: 250 }, 0)).toEqual(
      1,
    )
    expect(
      calculateHorizontalPercentage({ right: 1050, width: 250 }, 0),
    ).toEqual(0)
  })

  it('Should handle a horizontal threshold', () => {
    // 525 is half of 1050 - the full right size
    expect(
      calculateHorizontalPercentage({ width: 250, right: 525 }, 0.1),
    ).toEqual(0.5)
  })
})
