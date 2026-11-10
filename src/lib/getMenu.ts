import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-11-10': ['krämig-lax'],
  '2026-11-11': ['linsgryta'],
  '2026-11-12': ['kokoskyckling'],
  '2026-11-13': ['tacokväll'],
  '2026-11-14': ['svamprisotto'],
  '2026-11-15': ['indiskt-kryddad-lammgryta']
}

export function getMenu(): Menu {
  return MENU
}
