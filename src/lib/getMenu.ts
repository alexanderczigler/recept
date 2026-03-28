import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-03-30': ['laxokado'],
  '2026-03-31': ['spenat-och-fetaostpaj']
}

export function getMenu(): Menu {
  return MENU
}
