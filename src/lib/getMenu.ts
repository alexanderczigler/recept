import type { Menu } from './types/menu'

const MENU: Menu = {
  '2026-07-06': ['laxokado'],
  '2026-07-07': ['tofu-stroganoff', 'tofu-stroganoff'],
  '2026-07-09': ['chana-daal'],
  '2026-07-10': ['svamprisotto'],
}

export function getMenu(): Menu {
  return MENU
}
