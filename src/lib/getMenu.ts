import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-05-24': ['pokebowl'],
  '2026-05-25': ['italiensk-kycklinggryta'],
  '2026-06-26': ['italiensk-kycklinggryta'],
  '2026-06-27': ['gnocchi-köttfärssås'],
  '2026-06-28': ['gnocchi-köttfärssås'],
  '2026-06-29': ['potatisgratäng']
}

export function getMenu(): Menu {
  return MENU
}
