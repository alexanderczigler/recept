import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-10-11': ['saffranspasta-med-kräftstjärtar'],
  '2026-10-12': ['currykyckling'],
  '2026-10-14': ['ugnsbakad-lax']
}

export function getMenu(): Menu {
  return MENU
}
