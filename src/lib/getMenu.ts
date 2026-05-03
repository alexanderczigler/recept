import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-05-04': ['currykyckling', 'currykyckling'],
  '2026-05-06': ['halloumi-potatis-tzatziki'],
  '2026-06-07': ['gnocchi-köttfärssås', 'gnocchi-köttfärssås']
}

export function getMenu(): Menu {
  return MENU
}
