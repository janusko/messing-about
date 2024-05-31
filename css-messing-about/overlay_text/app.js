const heroTitle = document.querySelector('.hero-title');
const heroTitleOverlay = document.querySelector('.hero-title[data-overlay]');

heroTitleOverlay.innerText = heroTitle.textContent


// following: https://codepen.io/tmrDevelops/pen/vOPZBv

const c = document.getElementById('canv');
const $ = c.getContext('2d');


const col = function(x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1,1);
}
const R = function(x, y, t) {
  return( Math.floor( 0 * Math.cos( (x*x-y*y)/300 + t )) );
}

const G = function(x, y, t) {
  return( Math.floor(192 + 38 * Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

const B = function(x, y, t) {
  return( Math.floor(192 + 48 * Math.sin( 5 * Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

let time = 0;

var run = function() {
  for(x = 0; x <= 35; x++) {
    for(y = 0; y <= 35; y++) {
      col(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
    }
  }
  time = time + 0.01;
  window.requestAnimationFrame(run);
}

run();
