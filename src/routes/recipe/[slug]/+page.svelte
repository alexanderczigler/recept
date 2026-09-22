<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import type { PageData } from './$types'

  export let data: PageData
  const { recipe } = data

  let wakeLock: WakeLockSentinel | null = null
  let screenLockActive = false
  let wakeLockSupported = false

  onMount(() => {
    wakeLockSupported = 'wakeLock' in navigator
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onDestroy(() => {
    if (typeof document === 'undefined') return
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    wakeLock?.release()
  })

  async function handleVisibilityChange() {
    if (screenLockActive && !wakeLock && document.visibilityState === 'visible') {
      await requestWakeLock()
    }
  }

  async function requestWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request('screen')
      wakeLock.addEventListener('release', () => {
        wakeLock = null
      })
      screenLockActive = true
    } catch {
      screenLockActive = false
    }
  }

  async function toggleWakeLock() {
    if (screenLockActive) {
      await wakeLock?.release()
      wakeLock = null
      screenLockActive = false
    } else {
      await requestWakeLock()
    }
  }
</script>

<h1>{recipe.title}</h1>

{#if wakeLockSupported}
  <button
    type="button"
    class="wake-lock-button"
    class:active={screenLockActive}
    on:click={toggleWakeLock}
  >
    {screenLockActive ? '🔆 Skärmen hålls tänd' : '🔅 Håll skärmen tänd'}
  </button>
{/if}

<h2>Ingredienser</h2>
<ul>
  {#each recipe.ingredients as { name, quantity, unit } (name)}
    <li>{name} <span class="quantity-unit">({quantity} {unit})</span></li>
  {/each}
</ul>

{#if recipe.pantry}
  <h3>Från skafferiet</h3>
  <ul>
    {#each recipe.pantry as item (item)}
      <li>{item}</li>
    {/each}
  </ul>
{/if}

{#if recipe.sides}
  <h3>Passande tillbehör</h3>
  <ul>
    {#each recipe.sides as side (side)}
      <li>{side}</li>
    {/each}
  </ul>
{/if}

<h2>Instruktioner</h2>
<ol>
  {#each recipe.instructions as step (step)}
    <li>{step}</li>
  {/each}
</ol>

<style>
  @reference "../../../app.css";

  .wake-lock-button {
    cursor: pointer;
    border: 1px solid var(--link-color);
    border-radius: 999px;
    color: var(--link-color);
    background: transparent;
    @apply mr-4 ml-4 px-4 py-2 text-sm;
  }

  .wake-lock-button.active {
    color: white;
    background: var(--link-color);
  }

  ul {
    list-style-type: none;
    padding: 0;
    @apply mr-4 ml-4;
  }

  li {
    margin: 0.5em 0;
    text-transform: capitalize;
  }

  ul li::before {
    content: '›';
    margin-right: 0.4em;
    opacity: 0.4;
  }

  .quantity-unit {
    text-transform: none;
  }

  ol {
    list-style: none;
    counter-reset: item;
    @apply mr-4 ml-4;
  }
  ol li {
    counter-increment: item;
    margin-bottom: 5px;
  }
  ol li:before {
    margin-right: 10px;
    content: counter(item);
    background: var(--counter-color);
    border-radius: 100%;
    color: white;
    width: 1.2em;
    text-align: center;
    display: inline-block;
  }
</style>
