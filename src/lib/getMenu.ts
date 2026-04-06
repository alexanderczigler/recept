import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-04-07': ['ugnsbakad-lax'],
  '2026-04-08': ['pokebowl'],
  '2026-04-09': ['spenat-och-fetaostpaj']
}

export function getMenu(): Menu {
  return MENU
}
