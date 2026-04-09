import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-04-14': ['ugnsbakad-lax'],
  '2026-04-15': ['pokebowl'],
  '2026-04-16': ['spenat-och-fetaostpaj']
}

export function getMenu(): Menu {
  return MENU
}
