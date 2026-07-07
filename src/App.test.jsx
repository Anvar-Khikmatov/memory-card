import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

beforeEach(() => {
 

  vi.stubGlobal('Audio', class {
  play = vi.fn()
  pause = vi.fn()
  loop = false
})

  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'npc_dota_hero_antimage', localized_name: 'Anti-Mage', imgName: 'antimage' },
        { id: 2, name: 'npc_dota_hero_axe', localized_name: 'Axe', imgName: 'axe' },
        { id: 3, name: 'npc_dota_hero_bane', localized_name: 'Bane', imgName: 'bane' },
        { id: 4, name: 'npc_dota_hero_bloodseeker', localized_name: 'Bloodseeker', imgName: 'bloodseeker' },
        { id: 5, name: 'npc_dota_hero_crystal_maiden', localized_name: 'Crystal Maiden' },
        { id: 6, name: 'npc_dota_hero_drow_ranger', localized_name: 'Drow Ranger' },
        { id: 7, name: 'npc_dota_hero_earthshaker', localized_name: 'Earthshaker' },
        { id: 8, name: 'npc_dota_hero_juggernaut', localized_name: 'Juggernaut' },
        { id: 9, name: 'npc_dota_hero_crystal_maiden', localized_name: 'Crystal Maiden' },
        { id: 10, name: 'npc_dota_hero_drow_ranger', localized_name: 'Drow Ranger' },
        { id: 11, name: 'npc_dota_hero_earthshaker', localized_name: 'Earthshaker' },
        { id: 12, name: 'npc_dota_hero_juggernaut', localized_name: 'Juggernaut' },
      ])
    })
  ))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App handleClick', () => {
  it('clicking a card increases the score', async () => {
    const user = userEvent.setup()
    render(<App />)
    const cards = await screen.findAllByTestId('card', {}, { timeout: 5000 })
    await user.click(cards[0])
    expect(screen.getByText('Current score: 1')).toBeInTheDocument()
  })

  it('clicking the same card twice shows the loss modal', async () => {
    const user = userEvent.setup()
    render(<App />)
    const cards = await screen.findAllByTestId('card', {}, { timeout: 5000 })
    await user.click(cards[0])
    const sameCard = await screen.findAllByTestId('card')
    await user.click(sameCard[0])
    expect(screen.getByText('Better luck next time')).toBeInTheDocument()
  })

  it('round increases to 2 after clicking 4 unique cards', async () => {
    const user = userEvent.setup()
    render(<App />)

    const cards = await screen.findAllByTestId('card')
    await user.click(cards[0])
    await user.click(cards[1])
    await user.click(cards[2])
    await user.click(cards[3])

    expect(screen.getByText(/2\/7 round/i)).toBeInTheDocument()
  })
})