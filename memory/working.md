# Working memory

Agents: update every milestone. Long runs: follow `docs/agent/LONGEVITY.md`.

## Session / heartbeat

- Goal: Screenshot Deep Time in docs; push LearningLogic and Charts
- Status: `in_progress`
- Pillar: `web`
- Bridge mode: `yes`
- Mutation policy: `agent_may_edit`
- Started: 2026-08-13
- Last compact at: —
- Context pressure: `low`
- Active task: Docs screenshot + GitHub push (LearningLogic + Charts)
- Retries: 0
- Last verify: Charts overview smoke tests passed; LearningLogic package pending
- Stop reason: —
- Model primary / fallback: —

## Decisions (settled — do not re-ask)

- Deep Time ships as a static page under `apps/web/public/deep-time/` and is embedded like World Charts.
- Same page copied into Bureau/Charts as `deep-time/` with a header link from the dashboard.

## Paths & artifacts

| Path | Why it matters |
|------|----------------|
| `docs/deep-time-screenshot.png` | README / LOCAL / GO_LIVE preview |
| `Charts/deep-time/` | Standalone copy in the Charts repo |
| `Charts/deep-time-screenshot.png` | Charts README preview |

## Next step

Package LearningLogic, commit + push both repos.

## Queue

- Active task: screenshot + push
