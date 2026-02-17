/* ===== Black Cat Rolling Animation (right-bottom corner) ===== */
(function() {
  var TOTAL_FRAMES = 8;
  var FRAME_INTERVAL = 180; // ms per frame (slower rolling)

  var container = null; // .black-cat
  var sprite = null;    // img.cat-sprite
  var frameIndex = 0;

  /* Preload all frames */
  var frameSrcs = [];
  var preloaded = [];
  for (var i = 0; i < TOTAL_FRAMES; i++) {
    frameSrcs.push('images/cat-frame-' + i + '.png');
    var img = new Image();
    img.src = frameSrcs[i];
    preloaded.push(img);
  }

  /* Small range horizontal drift */
  var driftX = 0;
  var driftDir = -1;       // -1 = moving left, 1 = moving right
  var DRIFT_RANGE = 80;    // px total drift range
  var DRIFT_SPEED = 0.4;   // px per frame

  function initCat() {
    container = document.querySelector('.black-cat');
    sprite = document.querySelector('.cat-sprite');
    if (!container || !sprite) return;

    frameIndex = 0;
    driftX = 0;
    driftDir = -1;
    sprite.src = frameSrcs[0];
    requestAnimationFrame(tick);
  }

  var lastTime = 0;
  function tick(timestamp) {
    if (!lastTime) lastTime = timestamp;

    if (timestamp - lastTime >= FRAME_INTERVAL) {
      lastTime = timestamp;

      // Advance frame
      frameIndex = (frameIndex + 1) % TOTAL_FRAMES;
      sprite.src = frameSrcs[frameIndex];

      // Drift horizontally
      driftX += DRIFT_SPEED * driftDir;
      if (driftX < -DRIFT_RANGE) {
        driftX = -DRIFT_RANGE;
        driftDir = 1;
      } else if (driftX > 0) {
        driftX = 0;
        driftDir = -1;
      }

      // Flip cat based on direction
      var scaleX = driftDir === -1 ? 1 : -1;
      container.style.transform = 'translateX(' + driftX + 'px) scaleX(' + scaleX + ')';
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCat);
  } else {
    initCat();
  }
})();
