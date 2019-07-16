import { renderHook } from '@testing-library/react-hooks'
import { useScrollPercentage } from '../src/useScrollPercentage'

it('should execute the useScrollPercentage hook', () => {
  const { result } = renderHook(() => useScrollPercentage())
  const [ref, percentage] = result.current
  expect(percentage).toBe(0)

  // This test should be expanded upon. Needs to handle both intersection observer and scrolling updates.
})
