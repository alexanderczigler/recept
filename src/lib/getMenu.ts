import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-09-12': ['gnocchi-köttfärssås'],
  '2026-09-13': ['chana-daal'],
  '2026-09-15': ['ugnsbakad-lax']
}

export function getMenu(): Menu {
  return MENU
}
