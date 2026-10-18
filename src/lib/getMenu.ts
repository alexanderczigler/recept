import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-10-18': ['enkel-fiskgryta-med-saffran'],
  '2026-10-19': ['sötpotatis-och-morotsoppa']
}

export function getMenu(): Menu {
  return MENU
}
