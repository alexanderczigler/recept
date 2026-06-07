import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-06-08': ['chicken-tikka-masala'],
  '2026-06-09': ['chicken-tikka-masala'],
  '2026-06-10': ['grekisk-sallad'],
  '2026-06-11': ['ugnsbakad-lax'],
  '2026-06-12': ['quesadillas'],
}

export function getMenu(): Menu {
  return MENU
}
