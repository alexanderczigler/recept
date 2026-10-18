<script lang="ts">
  import type { Ingredient } from '$lib/types/ingredient'
  import { SvelteSet } from 'svelte/reactivity'
  import type { PageData } from './$types'

  export let data: PageData
  const ingredients = data.ingredients as Ingredient[]
  const pantry = data.pantry as string[]
  const sides = data.sides as string[]
  const staples = data.staples as string[]

  // Lokal state för avkryssade ingredienser i inköpslistan
  const checkedItems: SvelteSet<string> = new SvelteSet()

  // Funktion för att toggla avkryssning
  function toggleChecked(itemName: string) {
    if (checkedItems.has(itemName)) {
      checkedItems.delete(itemName)
    } else {
      checkedItems.add(itemName)
    }
  }
</script>

<h1>Veckohandling</h1>

<h2>Ingredienser</h2>
{#if ingredients.length > 0}
  <ul class="shopping-list">
    {#each ingredients as { name, quantity, unit } (name)}
      <li class="shopping-item">
        <label>
          <input type="checkbox" on:change={() => toggleChecked(name)} />
          <span class:checked={checkedItems.has(name)}>
            {name}
            <span class="quantity-unit">
              ({quantity}
              {unit})
            </span>
          </span>
        </label>
      </li>
    {/each}
  </ul>
{:else}
  <p>Inga ingredienser hittades för veckomenyn.</p>
{/if}

<h2>Från skafferiet</h2>
<ul class="pantry">
  {#each pantry as item (item)}
    <li class="pantry-item">
      <label>
        <input type="checkbox" on:change={() => toggleChecked(item)} />
        {item}
      </label>
    </li>
  {/each}
</ul>

<h2>Valfria tillbehör</h2>
<ul class="sides">
  {#each sides as item (item)}
    <li class="sides-item">
      <label>
        <input type="checkbox" on:change={() => toggleChecked(item)} />
        {item}
      </label>
    </li>
  {/each}
</ul>

<h2>Alltid hemma</h2>
<ul class="staples">
  {#each staples as item (item)}
    <li class="staples-item">
      <label>
        <input type="checkbox" on:change={() => toggleChecked(item)} />
        {item}
      </label>
    </li>
  {/each}
</ul>

<style>
  .pantry,
  .shopping-list,
  .sides {
    text-transform: capitalize;
  }

  .quantity-unit {
    text-transform: lowercase;
  }
</style>
