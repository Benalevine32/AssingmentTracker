document.getElementsById("timePGB")[0].style.fontSize = "6vw";

var bar = new ProgressBar.Line(timePGB, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'},
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  step: (state, bar) => {
  bar.path.setAttribute('stroke', state.color);
  }
});

bar.animate(1.0);  // Number from 0.0 to 1.0