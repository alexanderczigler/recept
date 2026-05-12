import type { Recipe } from './recipes'

export type Menu = {
  [date: string]: Recipe[]
}
