import { readdirSync, writeFileSync } from 'node:fs'
import { resolve, basename } from 'node:path'

const recipesDir = resolve('src/lib/recipes')

const files = readdirSync(recipesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => basename(file, '.json'))

const members = files.map((name) => `  | '${name}'`).join('\n')
const typeFileContent = `// This file is auto-generated. Do not edit manually.

export type Recipe =\n${members}\n`

const outputPath = resolve('src/lib/types/recipes.ts')
writeFileSync(outputPath, typeFileContent)

console.log(`Recipe types generated successfully at: ${outputPath}`)
