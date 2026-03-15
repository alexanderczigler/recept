import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-03-19': ['tofu-stroganoff', 'tofu-stroganoff'],
  '2026-03-22': ['gnocchi-köttfärssås', 'gnocchi-köttfärssås']
}

export function getMenu(): Menu {
  return MENU
}
