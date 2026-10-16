(function () {
  function track(name, props) {
    var db = window.db || window.databuddy;
    if (db && typeof db.track === 'function') db.track(name, props || {});
  }
  function whenReady(fn) {
    if (window.db || window.databuddy) {
      fn();
      return;
    }
    var n = 0;
    var id = setInterval(function () {
      if (window.db || window.databuddy || ++n > 100) {
        clearInterval(id);
        if (window.db || window.databuddy) fn();
      }
    }, 50);
  }
  window.flightTrack = function (event, props) {
    whenReady(function () {
      track(event, props);
    });
  };
  window.flightTrackGameStarted = (function () {
    var done = false;
    return function (extra) {
      if (done) return;
      done = true;
      var game =
        document.documentElement.getAttribute('data-game') ||
        document.title;
      flightTrack('game_started', Object.assign({ game: game }, extra || {}));
    };
  })();
})();
