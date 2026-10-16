# Flight Games

Static mini-games for GitHub Pages: [https://hiccup-za.github.io/flight-games/](https://hiccup-za.github.io/flight-games/)

## Analytics (Databuddy)

Every public HTML page includes [Databuddy](https://www.databuddy.cc) for cookieless analytics. When you add a **new game** (or any new top-level page), copy the same block from `index.html` immediately before `</body>`:

```html
<script
  src="https://cdn.databuddy.cc/databuddy.js"
  data-client-id="543a7cb0-3979-4000-a209-45af7ac28f26"
  data-track-web-vitals
  data-track-errors
  data-track-outgoing-links
  crossorigin="anonymous"
  async
></script>
<script src="../analytics.js"></script>
```

Use `src="analytics.js"` on the hub (`index.html`) and `src="../analytics.js"` inside a game folder.

On game pages, set `data-game` on the root element (for example `data-game="My Game"`) and call `flightTrackGameStarted()` once when the player actually starts a run (see existing games for examples).

Optional hub-only launch tracking: on link click, `flightTrack('game_launch', { game: '…', source: 'hub' })`.

After adding pages, bump the service worker cache version in `sw.js` and list new assets in `FILES`.
