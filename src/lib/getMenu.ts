import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-07-01': ['chicken-tikka-masala', 'chicken-tikka-masala'],
  '2026-07-03': ['laxokado'],
  '2026-07-04': ['svamprisotto'],
  '2026-07-05': ['chana-daal', 'krämig-lax'],
}

export function getMenu(): Menu {
  return MENU
}
