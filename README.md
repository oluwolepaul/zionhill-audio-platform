# Zionhill Audio Platform

[Open the live listener](https://playstation.zionhillmetrochurch.org) · [Regression checks](https://github.com/oluwolepaul/zionhill-audio-platform/actions)

## Try the local studio

With Node 24+, run `npm run build` and then `node preview.mjs`. Open `http://localhost:4173` to listen or `/studio` to try the local host controls. The preview uses an in-memory bucket and the local-only password `local-preview-only`. Run `npm test` for the regression suite.

**Audio path**

Browser microphone and music → Web Audio mixer → MP3 batches → Cloudflare Worker → R2 → live and recorded playback. The upload queue retries the same batch if acknowledgement is lost. A recording stays private until the host chooses to save it.

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

