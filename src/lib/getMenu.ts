import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-10-03': ['gryta-med-bönor-chorizo-och-färskost'],
  '2026-10-04': ['chicken-tikka-masala', 'chicken-tikka-masala'],
  '2026-10-06': ['gnocchi-köttfärssås']
}

export function getMenu(): Menu {
  return MENU
}
