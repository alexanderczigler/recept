import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-11-04': ['ugnsbakad-lax'],
  '2026-11-05': ['chana-daal', 'chana-daal'],
  '2026-11-06': ['tacopaj-med-creme-fraiche'],
  '2026-11-08': ['gnocchi-köttfärssås']
}

export function getMenu(): Menu {
  return MENU
}
