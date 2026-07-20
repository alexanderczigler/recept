import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-07-21': ['svamprisotto'],
  '2026-07-22': ['chana-daal', 'tofu-stroganoff'],
  '2026-07-23': ['gnocchi-köttfärssås', 'ugnsbakad-lax'],
  '2026-07-24': ['mexicali']
}

export function getMenu(): Menu {
  return MENU
}
