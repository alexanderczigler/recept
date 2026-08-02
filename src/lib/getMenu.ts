import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-08-03': ['gnocchi-köttfärssås'],
  '2026-08-04': ['färdig-risotto'],
  '2026-08-05': ['italiensk-kycklinggryta'],
  '2026-08-06': ['pokebowl'],
  '2026-08-09': ['ugnsbakad-lax']
}

export function getMenu(): Menu {
  return MENU
}
