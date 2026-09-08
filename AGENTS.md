# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Mistral, etc.) when working with code in this repository.

## What this is

"Middag" (Swedish for "dinner") is a self-hostable SvelteKit app: a recipe collection, weekly dinner planner, and grocery shopping list generator. There is no backend or database — the weekly menu and all recipes are hardcoded/checked into the repo. Live version: https://middag.czigler.se (deployed from `gh-pages`).

## Commands

```shell
nvm use && npm install       # node version pinned in .nvmrc (24), engine-strict in .npmrc
npm run dev -- --open        # dev server
npm run build                # production build (adapter-static) -> ./build
npm run preview              # preview the production build
npm run check                # svelte-kit sync + svelte-check (type checking)
npm run check:watch          # same, in watch mode
npm run lint                 # prettier --check . && eslint .
npm run format                # prettier --write .
npm run test                 # vitest run (single run)
npm run test:unit            # vitest (watch mode)
npm run generate             # regenerate src/lib/types/recipes.ts from src/lib/recipes/*.json
```

Run a single test file with `npx vitest run path/to/file.test.ts`. Test files live alongside source, matched by `src/**/*.{test,spec}.{js,ts}` (vite.config.ts) — none exist yet.

CI (`.github/workflows/pr.yaml`) runs `npm run lint` and `npm run build` on every PR. Pushes to `main` (`.github/workflows/main.yaml`) additionally run `npm run generate` before building, then force-push the `build/` output to the `gh-pages` branch — so `recipes.ts` is regenerated at publish time and an agent that can't run shell commands (e.g. from a web prompt) doesn't need to run `npm run generate` itself before committing a new recipe.

## Commit messages

Use context-based commits, not conventional commits (`feat:`/`fix:`/`chore:`). Prefix with the area touched, e.g.:

```
recipes: add wallenbergare
menu: plan week
shoppingList: fix pantry dedupe
```

## Common task: add a recipe from a URL

A frequent request is "add this recipe" with a link (typically ica.se or koket.se). Workflow:

1. Fetch the page and adapt its recipe to this repo's schema (see the recipe JSON schema below) — translate/normalize units to the `Unit` union in `src/lib/types/unit.ts`, split staple items (salt, oil, spices) into `pantry` rather than `ingredients`, and write instructions in Swedish (translate if the source isn't).
2. Pick a slug (kebab-case, matching existing filenames) and check it's not already taken — list `src/lib/recipes/` and make sure no file of that name (or an obvious near-duplicate recipe) already exists. Slugs almost never change once added, so this is a quick sanity check, not a big deal either way.
3. Create `src/lib/recipes/<slug>.json`. No need to run `npm run generate` yourself — CI regenerates `recipes.ts` as part of the `gh-pages` deploy (see Commands above); run it locally only if you're in an environment that can execute shell commands and want the typeahead/type-checking to reflect the new recipe right away.
4. If you can run shell commands, run `npm run lint` and `npm run test`. If not, skip — CI will catch issues on push.
5. Commit with a context-based message, e.g. `recipes: add wallenbergare`, and push.

## Architecture

- **Data model, not a CMS.** All content lives in source:
  - `src/lib/getMenu.ts` — the weekly plan, a hardcoded `Menu` object (`{ [isoDate: string]: slug[] }`, one or more recipe slugs per day).
  - `src/lib/recipes/<slug>.json` — one file per recipe, slug = filename without `.json`. Instructions are written in Swedish, matching the rest of the UI text. Schema:
    ```json
    {
      "title": "Human-readable title",
      "ingredients": [{ "name": "Ingredient name", "quantity": 1, "unit": "dl" }],
      "instructions": ["Step 1 in Swedish.", "Step 2 in Swedish."],
      "sides": ["pasta"],
      "pantry": ["Salt", "Olivolja"]
    }
    ```
    `ingredients` are measured items (quantity + unit); `pantry` is staples used but not measured (salt, oil, spices); `sides` are optional serving suggestions.
  - `src/lib/getRecipes.ts` loads every recipe JSON via `import.meta.glob`; the slug is `module.default.slug` or falls back to the filename.
- **Two different `Recipe` types — do not confuse them:**
  - `src/lib/types/recipe.ts` — the recipe **object** shape (ingredients, instructions, slug, title, ...).
  - `src/lib/types/recipes.ts` — an **auto-generated** union of every recipe slug string (e.g. `'daal' | 'pokebowl' | ...`), used by `Menu` in `src/lib/types/menu.ts` so editors get slug typeahead/validation in `getMenu.ts`.
  - After adding/renaming/removing a recipe JSON file, run `npm run generate` (regenerates `recipes.ts` via `scripts/generateRecipeTypes.js`) — never hand-edit that file.
- **Routes** (SvelteKit, fully prerendered — `prerender = true` set globally in `src/routes/+layout.ts`, static adapter with `404.html` fallback):
  - `/` — weekly menu, splits "today" vs. upcoming by matching `Menu` dates against the current date.
  - `/recipe` — full recipe index; `/recipe/[slug]` — single recipe detail (`entries()` in `+page.ts` enumerates all slugs for prerendering).
  - `/shoppingList` — derived view: walks every slug referenced in `Menu`, sums ingredient quantities across recipes (matched by lowercased name + unit), and dedupes `pantry`/`sides` lists across recipes.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`. Component `<style>` blocks that use Tailwind utilities need `@reference "<path-to>/app.css";` at the top (Svelte scoped styles don't see Tailwind by default).
- **Base path**: `svelte.config.ts` reads `BASE_PATH` from the environment for `kit.paths.base`, so deploys under a subpath are supported; use the `resolve()` helper from `$app/paths` for internal links rather than hardcoding `/...` hrefs.
