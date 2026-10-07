import type { Recipe } from '$lib/types/recipe'
import { getRecipes } from '$lib/getRecipes'

export async function load(): Promise<{ recipes: Recipe[] }> {
  const recipes = await getRecipes()
  return { recipes }
}
