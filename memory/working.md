# Working memory

Agents: update every milestone. Long runs: follow `docs/agent/LONGEVITY.md`.

## Session / heartbeat

- Goal: Pack Charts for jonathanpratte.com/charts/
- Status: `done`
- Pillar: `web`
- Bridge mode: `yes`
- Mutation policy: `agent_may_edit`
- Started: 2026-08-13
- Last compact at: —
- Context pressure: `low`
- Active task: —
- Retries: 0
- Last verify: `npm run pack` + overview smoke tests passed
- Stop reason: queue complete
- Model primary / fallback: —

## Decisions (settled — do not re-ask)

- Charts deploys as static files to `public_html/charts/` on jonathanpratte.com (not tobelogic.com).
- Subfolder `.htaccess` turns RewriteEngine Off so WordPress does not 404 /charts/.
- Map fetch tries world-map.geojson then world-map.json.

## Next step

Human: FTP contents of `Charts/deploy/` into `public_html/charts/` on jonathanpratte.com.

## Queue

- Active task: —
