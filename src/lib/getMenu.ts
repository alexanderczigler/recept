import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-09-23': ['ugnsbakad-lax'],
  '2026-09-24': ['pokebowl'],
  '2026-09-25': ['tacopaj-med-creme-fraiche'],
  '2026-09-27': ['laxinoa']
}

export function getMenu(): Menu {
  return MENU
}
