import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-06-15': ['laxinoa'],
  '2026-06-16': ['italiensk-kycklinggryta'],
  '2026-06-17': ['italiensk-kycklinggryta'],
  '2026-06-18': ['tonfisksallad']
}

export function getMenu(): Menu {
  return MENU
}
