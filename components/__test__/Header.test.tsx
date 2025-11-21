import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('should not render title', () => {
    render(<Header title="" />)
    expect(screen.queryByText('title')).toBeNull()
  })

  it('should render title', () => {
    render(<Header title="title" />)
    expect(screen.getByText('title')).toBeDefined()
  })
})
