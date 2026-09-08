# Middag

TLDR; Self-hostable recipe collection, weekly dinner planner and grocery shopping list generator.

> 💬 "Middag" means dinner in Swedish.

For the longest time, I have been planning my weekly dinner menu and grocery shopping in Google Sheets. I started working on this project because I wanted a simple way to collect my family's favourite recipes and keep them close to where we have our weekly dinner menu planned. In addition to this, I thought it would be nice to also get an automatic grocery shopping list generated from the planned menu.

The dinner menu is hard coded in `./src/lib/getMenu.ts`. So there is really little magic going on.

If you want to use it, feel free to fork the project. A tip is to host it in GitHub Pages, Vercel or similar. Check out a live version here: [https://middag.czigler.se](https://middag.czigler.se).

## Running

```shell
nvm install && npm use
npm install
npm run dev -- --open
```

## Recipes

When you have modified the recipe collection, run `npm run generate` to update the Recipe type.

## About

I built this project by hand but lately I have started automating changes using agents. The main reason is that it is a fairly harmless project to experiment on and I also want everyone in the family to be able to modify the cookbook and menu using only a prompt.
