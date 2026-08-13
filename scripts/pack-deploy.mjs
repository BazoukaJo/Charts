import { cpSync, mkdirSync, rmSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'deploy')

const files = [
  '.htaccess',
  'index.html',
  'dashboard-overview.css',
  'dashboard-overview.js',
  'dashboard-phase1.js',
  'dashboard-phase2.js',
  'dashboard-i18n.js',
  'dashboard-i18n-fr-content.js',
  'dashboard-i18n-es.js',
  'dashboard-core.js',
  'dashboard-nav.js',
  'world-map.geojson',
  'world-map.json',
  'en.json',
  'es.json',
  'fr.json',
]

const dirs = ['deep-time']

if (existsSync(out)) rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

for (const name of files) {
  const src = join(root, name)
  if (!existsSync(src)) {
    console.error('missing required file:', name)
    process.exit(1)
  }
  cpSync(src, join(out, name))
}

for (const name of dirs) {
  const src = join(root, name)
  if (!existsSync(src)) continue
  cpSync(src, join(out, name), { recursive: true })
}

writeFileSync(
  join(out, 'UPLOAD-HERE.txt'),
  `Upload the CONTENTS of this folder into public_html/charts/ on jonathanpratte.com

Target URL: https://jonathanpratte.com/charts/

After upload, these must exist on the server:
  public_html/charts/index.html
  public_html/charts/.htaccess
  public_html/charts/world-map.geojson
  public_html/charts/world-map.json
  public_html/charts/dashboard-overview.js

Then open:
  https://jonathanpratte.com/charts/
  https://jonathanpratte.com/charts/world-map.json
(the second URL must show JSON, not the WordPress site)

Do not upload this UPLOAD-HERE.txt file.
`,
)

console.log('Ready to upload folder:')
console.log(' ', out)
console.log('Drag its CONTENTS into public_html/charts/ on jonathanpratte.com')
