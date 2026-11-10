# Zionhill Playstation

Public church audio at https://playstation.zionhillmetrochurch.org. Listeners need no account. Hosts sign in at `/studio` as Zionhill Global. The warm orange and brown identity follows the church reference.

## Listening

The persistent native audio player provides explicit live connection states, bounded reconnect attempts, deliberate pause/resume, Jump to live and Media Session controls. Recording pages have direct share links and social previews, remembered position on the current browser, 15-second skips, speed, share and download controls. Recordings are indexed, searched and paginated independently of small live-status updates. Visible pages poll status every ten seconds; hidden pages keep the native audio connection and stop catalogue polling.

Native audio supports browser background playback subject to browser/OS/network limits. Physical iPhone/Android background and lock-screen playback, actual end-to-end delay, long broadcasts and a 200–500-listener capacity test remain required before making reliability or audience-capacity claims. Installation is optional; service-worker installation does not guarantee uninterrupted audio. Upcoming-broadcast calendar reminders use a downloaded ICS file, not push notifications.

## Hosting

Prepare → Live → Finish: choose a microphone and speech/music quality, Check sound, preview music with headphones and optionally record a five-second **private** sound test. Go live starts a separate capture mode; preflight audio is never uploaded. Meter readings reflect actual microphone, music and output signals, with peak warnings. The sticky action bar keeps critical controls and mic/music/upload status visible. Mobile faders are horizontal and the mixer can collapse.

Select local music files before or during a broadcast. Adding files preserves current playback; queued songs await manual Play. Reorder, loop, seek, restart and use short fades. Optional speech detection lowers music during speech and restores it after a short hold. Local monitoring never routes microphone audio back to speakers. Speech and music reach the same broadcast/recording bus. Spotify, YouTube and audio from other phone apps are not captured.

Save a playlist explicitly to IndexedDB on the current browser/device (100 MB maximum); Load saved playlist appends it without interrupting the current song. Playback never autostarts after reload. Device storage may be cleared by the browser or unavailable in private browsing.

End broadcast stops the server-side live session independently of uploads, closes microphone capture and immediately offers Yes/No. Yes waits for remaining uploads, seals and publishes the recording. No cancels queued uploads and permanently discards uploaded audio. Uploaded audio stays private until publication. Keep the studio tab open until finishing: queued audio is in memory and cannot survive tab closure. An unsealed stopped broadcast accepts queued sections for up to 24 hours after its last activity; a disconnected live session expires after 45 seconds. Interrupted uploaded audio can be recovered from Drafts.

Administrators can preview, rename/edit speaker and description, publish drafts, move recordings to Trash, restore, or delete forever with confirmation. Trash does not expire automatically. The end-of-broadcast No choice remains permanent discard. Legacy recordings retain public visibility. No production recordings are modified as part of deployment.

## Access and settings

The existing administrator password is verified against runtime secret `HOST_PASSWORD_HASH` (salted PBKDF2 SHA-256, 100,000 iterations). `SESSION_SECRET` signs a Secure, HttpOnly, SameSite=Strict seven-day cookie; R2 session records and an epoch provide server-side logout and sign-out-all revocation. Existing stateless sessions must sign in again after this release. The administrator password itself is unchanged and never embedded in source.

Channel settings support square church-artwork upload, next-broadcast date/time and an optional **separate** broadcast-only password. Broadcast-only sessions may start broadcasts and save/discard their own private sessions; they cannot manage published recordings or administrator settings. Changing/disabling that password revokes previous broadcaster sessions. No broadcast-only password is created until the administrator sets one.

## Storage and delivery

Cloudflare Worker ESM, R2 `BUCKET`, no database. Configure a hosting identity for your own environment. Atomic R2 conditional writes reserve the current broadcast and update meeting metadata. The compact public catalogue is rebuilt on changes with conditional writes. Live status is shared for two seconds within an isolate and uses a two-second browser cache. Metadata reads and recently requested audio sections are shared within an isolate. Sites disallows the default edge Cache API; no edge-cache dependency is required. Long recordings use pull-based byte-range streaming and respect cancellation.

New broadcasts: native MP3, one-second capture sections sent in adaptive batches. Capture continues while a request is in flight; a retry retains the exact batch bytes and index. The uploader accumulates about three seconds before sending and combines queued sections into requests capped at 512 KB. This avoids serial one-second writes falling behind the measured 3–4 second storage round trips. Speech: 16 kHz mono, 64 kbps (~29 MB/hour audio payload). Music: 32 kHz mono, 128 kbps (~58 MB/hour), higher fidelity and about twice the data. Legacy 16 kHz PCM/WAV archives remain playable. New batched sessions wait for at least five seconds of uploaded audio before becoming ready, then start from recent complete batches as a jitter buffer; metadata is checked at 500 ms intervals. No subsecond latency guarantee. Maximum broadcast length: 24 hours. Encoder notices and source are available through `/third-party-notices.txt`, `/encoder-license.txt` and `/encoder.js`.

## Development

Node 24+. No package installation required. `node build.mjs` embeds the HTML, modules, encoder, legal notices and generated PNG icons into `dist/server/index.js`. `npm test` runs all regression checks. The local `node preview.mjs` uses isolated in-memory storage, silent audio fixtures and a preview-only password; it never connects to production storage. Runtime secrets and repository credentials must stay out of the source tree.

Regression checks cover concurrent broadcast reservation, stop/save/discard under a held upload, session revocation and role separation, catalogue read count and pagination, private test isolation, both real MP3 quality settings, archived byte ranges, reconnect bounds, queue preservation/reordering, saved-recording permissions, Trash/Restore and safe recording share metadata.

Upload recovery update (release 11): save progress shows uploaded and pending audio time, errors retain their specific cause, a private synthetic upload-connection check is available before broadcasting, and unmute explicitly re-enables the microphone track and resumes the audio engine. Suspended audio has a Resume audio action. Existing uploaded recordings are unchanged. Local browser engine checks use generated voice/music tones and verify repeated mute/unmute, continuous music and both tones in a decoded MP3 recording without activating a microphone.

Compact live studio: Go live closes Broadcast details and shows a compact title/timer/output meter with sticky Mute, End and Share controls. Device setup, administration and explanatory tips are hidden while on air. Music transport remains visible; Queue and More controls reveal secondary controls without stopping audio. Ending restores the preparation view.
