import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-05-12': ['gnocchi-köttfärssås', 'gnocchi-köttfärssås'],
  '2026-05-13': ['grekisk-sallad'],
  '2026-06-15': ['pokebowl']
}

export function getMenu(): Menu {
  return MENU
}
