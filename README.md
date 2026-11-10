# Zionhill Audio Platform

A browser-based broadcasting studio and public listening experience.

**JavaScript · Web Audio API · AudioWorklet · Cloudflare Workers · R2**

[Developer portfolio](https://github.com/oluwolepaul)

## Product features

- Prepare → Live → Finish host workflow with microphone checks and compact mobile controls.
- Microphone/music mixing, output metering, local playlists and optional speech-based music ducking.
- Adaptive audio uploads, private drafts, publication, archive playback and byte-range delivery.
- Administrator and broadcast-only sessions, server-side revocation and role separation.

## Architecture

Browser capture → Web Audio mixer → MP3 encoding → batched uploads → Worker routes → R2 storage → live/archive audio player.

## Code map

- `worker/index.js` — server routes and persistence
- `mixer.js`, `worklet.js`, `upload.js` — audio processing and transport
- `client.js`, `listener.js`, `player.js` — studio and listening interfaces
- `*.test.mjs` — regression coverage

## Run locally

Node 24 or newer. Run `npm test` (which builds first), or run `node build.mjs` to build only. For an isolated local preview, run `node preview.mjs` and use the URL printed in the terminal. The preview uses in-memory storage. Deploy `dist/server/index.js` to your own Cloudflare Worker with an R2 binding named `BUCKET`; configure `HOST_PASSWORD_HASH` and `SESSION_SECRET` through your hosting secret manager. No live account credentials are included.

## Status and limitations

The project record includes publication at [Zionhill Playstation](https://playstation.zionhillmetrochurch.org). This repository is a portfolio snapshot, independent of the live deployment. Physical-device background playback, measured end-to-end latency, long-duration sessions and audience-capacity testing remain separate validation work. No subsecond-latency or listener-capacity guarantee is claimed.

## Engineering discussion

This project provides examples of connecting user journeys to data, handling state and failure paths, and working within platform constraints. It was developed with AI-assisted tooling. Features are described from source and project records; unmeasured business outcomes, usage counts and performance claims are intentionally omitted.

## Rights and configuration

Published with the project owner's permission. Brand assets and third-party components retain their respective rights. See any included license and third-party notices. Public visibility does not grant a new license to third-party artwork or content. Runtime credentials and private customer information are not included.
