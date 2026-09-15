import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-09-12': ['gnocchi-köttfärssås'],
  '2026-09-16': ['chana-daal'],
  '2026-09-18': ['ugnsbakad-lax']
}

export function getMenu(): Menu {
  return MENU
}
