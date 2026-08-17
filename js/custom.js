(function () {
  var subtitleLines = [
    "Still becoming.",
    "Observe. Understand. Build.",
    "A river of ideas, experiences, and choices.",
    "在每一次选择中，成为自己"
  ];

  var subtitleTimer = null;
  var subtitleRunId = 0;
  var starLayerLoaded = false;

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function clearSubtitleTimer() {
    if (subtitleTimer) {
      window.clearTimeout(subtitleTimer);
      subtitleTimer = null;
    }
  }

  function initSubtitleTypewriter() {
    var subtitle = document.getElementById("subtitle");

    subtitleRunId += 1;
    clearSubtitleTimer();

    if (!subtitle) return;

    if (window.typed && typeof window.typed.destroy === "function") {
      try {
        window.typed.destroy();
      } catch (error) {
        // The theme may not have created a Typed instance; either state is fine.
      }
    }

    var runId = subtitleRunId;
    var lineIndex = 0;
    var charIndex = 0;
    var deleting = false;

    subtitle.classList.add("little-star-typewriter");
    subtitle.textContent = "";

    function schedule(delay) {
      subtitleTimer = window.setTimeout(tick, delay);
    }

    function tick() {
      if (runId !== subtitleRunId) return;

      var line = subtitleLines[lineIndex];

      if (!deleting) {
        charIndex += 1;
        subtitle.textContent = line.slice(0, charIndex);

        if (charIndex < line.length) {
          schedule(line.charAt(charIndex - 1) === "." ? 125 : 58);
        } else {
          deleting = true;
          schedule(1500);
        }
      } else {
        charIndex -= 1;
        subtitle.textContent = line.slice(0, Math.max(0, charIndex));

        if (charIndex > 0) {
          schedule(30);
        } else {
          deleting = false;
          lineIndex = (lineIndex + 1) % subtitleLines.length;
          schedule(260);
        }
      }
    }

    schedule(320);
  }

  function initStarLayer() {
    if (starLayerLoaded || prefersReducedMotion() || window.innerWidth < 769) return;
    starLayerLoaded = true;

    var layer = document.createElement("div");
    layer.className = "little-star-layer";
    layer.setAttribute("aria-hidden", "true");

    for (var i = 0; i < 46; i += 1) {
      var star = document.createElement("span");
      var size = (Math.random() * 2.4 + 1.2).toFixed(2) + "px";

      star.className = "little-star-particle";
      star.style.setProperty("--x", (Math.random() * 100).toFixed(2) + "%");
      star.style.setProperty("--y", (Math.random() * 100).toFixed(2) + "%");
      star.style.setProperty("--s", size);
      star.style.setProperty("--d", (Math.random() * 5 + 4).toFixed(2) + "s");
      star.style.setProperty("--delay", (Math.random() * -8).toFixed(2) + "s");
      layer.appendChild(star);
    }

    document.body.appendChild(layer);
  }

  function boot() {
    initSubtitleTypewriter();
    initStarLayer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  document.addEventListener("pjax:complete", boot);
}());
