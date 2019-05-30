import {
  calculateHorizontalPercentage,
  calculateVerticalPercentage,
} from '../src/utils'

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
