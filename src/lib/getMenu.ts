import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-10-12': ['currykyckling'],
  '2026-10-14': ['ugnsbakad-lax'],
  '2026-10-16': ['svamprisotto']
}

export function getMenu(): Menu {
  return MENU
}
