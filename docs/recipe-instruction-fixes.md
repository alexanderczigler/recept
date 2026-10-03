# Recipe instruction fixes

Inconsistencies found in `src/lib/recipes/*.json` on 2026-10-03. Work through them one at a time: fix a recipe, tick its box, and commit with a context-based message (e.g. `recipes: fix laxokado instructions`). Items marked **Decision needed** require an answer from the recipe owner before they can be fixed.

Keep the rules in [AGENTS.md](../AGENTS.md) in mind when editing: instructions are in Swedish, onion is `Lök`, and passerade/krossade tomater are counted in `förp`.

## 1. Broken or missing text

- [ ] **tacokväll** — `instructions` contains a single empty string. **Decision needed:** write standard taco-night steps from the ingredient list?
- [ ] **mapu-tofu**
  - Step 5 ends with "toppa med ." — the topping is missing. **Decision needed:** what goes on top (salladslök?).
  - Step 4 reads "Tillsätt såsen och sås" — garbled.
  - The tofu is never cut before it is added.
- [ ] **laxokado**
  - Step 4 says "Servera lax med quinoa", but this recipe uses svartris (copied from laxinoa).
  - Grönkål (200 g) is never used.
  - The oven is turned on, but no step bakes the salmon. **Decision needed:** baking time (about 15–20 min at 175°C is typical).
- [ ] **laxinoa** — same as laxokado: the oven is turned on, but the salmon is never baked and no time is given. **Decision needed:** baking time.

## 2. Instructions use ingredients that are not listed

- [ ] **potatisgratäng** — step 3 says "Skala och finhacka löken", but there is no onion. **Decision needed:** add a `Lök` ingredient, or remove the onion step?
- [ ] **broccoligratäng** — step 7 whisks "mjölk", but the ingredients are grädde and havredryck. It also says "riven ost" where the ingredient is parmesan. **Decision needed:** confirm that "mjölk" should become "grädde och havredryck".
- [ ] **ugnsbakad-falukorv** — step 3 spreads "ketchup", but the ingredient is tomatpuré. Also fix the typo "Skär ett skåror" and the missing period at the end of step 2.
- [ ] **tofu-stroganoff** — step 8 serves it with persilja, which is not listed.
- [ ] **bouillabaisse** — the bean aioli needs "en rostad vitlöksklyfta", but all the garlic is chopped in step 2 and nothing is roasted.
- [ ] **tonfisksallad** — uses olivolja, salt and peppar, none of which are in `ingredients` or `pantry`.

## 3. Ingredients that are never used

- [ ] **holy-caesar**
  - The salad leaves and picklad rödlök are never used, and the rice is never cooked.
  - Rice is listed twice: "Råris" in `ingredients` and "Svartris" in `pantry`.
  - **Decision needed:** which rice, and how should the leaves and picklad rödlök be used?
- [ ] **sötpotatisbowl**
  - Grönkål (400 g) is never used.
  - Mathavre is listed both in `ingredients` and in `pantry`.
  - Sojasås, balsamico and olivolja in `pantry` are never used.
- [ ] **thaiwok-kyckling** — the vattenkastanjer are never added, and there is no serving step.
- [ ] **tonfisksallad** — the citron and the soltorkade tomater are never used.
- [ ] **mexicali** (minor) — the avocado, mango, picklad rödlök and majschips are only covered by "lägg upp allt".

## 4. Steps in the wrong order

- [ ] **gnocchi-köttfärssås** — step 8, "Smaka av med salt och svartpeppar", comes after the salad step but belongs to the sauce. The title "Gnocchi med tomatsås" also doesn't match the meat sauce or the filename.
- [ ] **tonfisksallad** — the dressing step (7) comes after "Servera" (6).
- [ ] **linsgryta** — step 5, "Tillsätt övriga ingredienser", also covers the coconut milk, which is added in step 6.
- [ ] **daal** — step 3, "Tillsätt övriga ingredienser", also covers the yoghurt and the raita spice mix, which are used in step 4.

## 5. Spelling and wording

- [ ] "Youghurt" → "Yoghurt" in chicken-tikka-masala and daal (ingredient names and instructions), and in the halloumi-potatis-tzatziki ingredient name.
- [ ] "kondera"/"Konderad" is not a Swedish word. Replace it with "smaksätt" or "dressa" in gnocchi-köttfärssås, halloumi-potatis-tzatziki and tonfisksallad.
- [ ] **kokoskyckling** — "genomstekt" → "genomkokt" (the chicken is simmered).
- [ ] **tacopaj-med-creme-fraiche** — step 9 says "den rivna osten", but the ingredient is "Lagrad ost". Either say to grate it, or rename the ingredient.

## 6. Style consistency (optional)

**Decision needed:** should these be unified at all?

- [ ] Oven temperature is written as both "225 grader" and "225°C". Pick one.
- [ ] The rice step is worded several ways ("Förbered ris", "Koka ris.", "Koka ris enl. anvisningarna på paketet."). Two of them, in currykyckling and kokoskyckling, lack a final period.
- [ ] Oil, butter, salt or pepper is used in the instructions without being listed in `pantry` in chana-daal, chicken-tikka-masala, daal, pasta-tomatsås, tortellini-con-brodo, färdig-risotto and mapu-tofu.
