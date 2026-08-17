(function () {
  if (window.__littleStarPolishLoaded) return;
  window.__littleStarPolishLoaded = true;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || window.innerWidth < 769) return;

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
}());
