import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-03-19': ['tofu-stroganoff', 'tofu-stroganoff'],
  '2026-03-22': ['gnocchi-köttfärssås', 'gnocchi-köttfärssås']
}

export function getMenu(from?: string): Menu {
  if (from) {
    const fromDate = new Date(from)
    const menu: Menu = {}
    for (const [date, recipe] of Object.entries(MENU)) {
      if (new Date(date) >= fromDate) {
        menu[date] = recipe
      }
    }
    return menu
  }

  return MENU
}
