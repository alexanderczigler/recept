<script lang="ts">
  import { resolve } from '$app/paths'
  import { page } from '$app/stores'

  import '@fontsource/nunito/400.css'
  import '@fontsource/nunito/700.css' // for font-bold
  import '../app.css'

  const { children } = $props()
</script>

<main>
  <ul class="menu">
    <li>
      <a href={resolve('/')} class:active={$page.url.pathname === '/'}>Meny</a>
    </li>
    <li>
      <a href={resolve('/shoppingList')} class:active={$page.url.pathname === '/shoppingList'}
        >Veckohandling</a
      >
    </li>
    <li>
      <a href={resolve('/recipe')} class:active={$page.url.pathname.startsWith('/recipe')}>Recept</a
      >
    </li>
    <li>
      <a href={resolve('/menu.ics')}>Kalender</a>
    </li>
  </ul>

  <content>
    {@render children()}
  </content>
</main>

<style>
  @reference "../app.css";

  ul.menu {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: baseline;
    align-content: stretch;
    background-color: var(--nav-bg-color);

    @apply m-0;
  }

  ul.menu li {
    list-style-type: none;
    margin: 1em 0;
  }

  ul.menu a.active {
    font-weight: bold;
  }
</style>
