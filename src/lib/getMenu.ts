import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-11-04': ['ugnsbakad-lax'],
  '2026-11-05': ['gnocchi-köttfärssås'],
  '2026-11-06': ['tacopaj-med-creme-fraiche'],
  '2026-11-08': ['chana-daal', 'chana-daal']
}

export function getMenu(): Menu {
  return MENU
}
