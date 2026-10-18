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

  let copied = false

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  function checklist(items: { key: string; label: string }[]) {
    return items
      .map(({ key, label }) => `- [${checkedItems.has(key) ? 'x' : ' '}] ${capitalize(label)}`)
      .join('\n')
  }

  // Bygger hela veckohandlingen som en Markdown-checklista (t.ex. för Obsidian)
  function toMarkdown() {
    const plain = (list: string[]) => list.map((item) => ({ key: item, label: item }))
    const sections: [string, { key: string; label: string }[]][] = [
      [
        'Ingredienser',
        ingredients.map(({ name, quantity, unit }) => ({
          key: `${name}|${unit}`,
          label: `${name} (${quantity} ${unit})`
        }))
      ],
      ['Från skafferiet', plain(pantry)],
      ['Valfria tillbehör', plain(sides)],
      ['Alltid hemma', plain(staples)]
    ]

    return [
      '# Veckohandling',
      ...sections
        .filter(([, items]) => items.length > 0)
        .map(([heading, items]) => `## ${heading}\n\n${checklist(items)}`)
    ].join('\n\n')
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(toMarkdown() + '\n')
    copied = true
    setTimeout(() => (copied = false), 2000)
  }
</script>

<h1>Veckohandling</h1>

<button class="copy" on:click={copyMarkdown}>
  {copied ? 'Kopierat!' : 'Kopiera som checklista'}
</button>

<h2>Ingredienser</h2>
{#if ingredients.length > 0}
  <ul class="shopping-list">
    {#each ingredients as { name, quantity, unit } (`${name}|${unit}`)}
      <li class="shopping-item">
        <label>
          <input type="checkbox" on:change={() => toggleChecked(`${name}|${unit}`)} />
          <span class:checked={checkedItems.has(`${name}|${unit}`)}>
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
  @reference "../../app.css";

  .copy {
    color: var(--link-color);
    cursor: pointer;

    @apply rounded border px-3 py-1;
  }

  .copy:hover {
    color: var(--link-hover-color);
  }

  .pantry,
  .shopping-list,
  .sides {
    text-transform: capitalize;
  }

  .quantity-unit {
    text-transform: lowercase;
  }
</style>
