import { describe, expect, it } from 'vitest'
import { getStaples } from './getStaples'

describe('getStaples', () => {
  it('is in Swedish alphabetical order', () => {
    const staples = getStaples()
    const sorted = [...staples].sort((a, b) => a.localeCompare(b, 'sv'))
    expect(staples).toEqual(sorted)
  })
})
