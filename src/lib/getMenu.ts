import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-11-20': ['tacokväll'],
  '2026-11-21': ['färdig-risotto', 'chana-daal'],
  '2026-11-22': ['currykyckling', 'currykyckling']
}

export function getMenu(): Menu {
  return MENU
}
