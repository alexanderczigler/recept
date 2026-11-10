import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-11-12': ['sötpotatis-och-morotsoppa'],
  '2026-11-13': ['tacokväll'],
  '2026-11-14': ['svamprisotto'],
  '2026-11-15': ['indiskt-kryddad-lammgryta']
}

export function getMenu(): Menu {
  return MENU
}
