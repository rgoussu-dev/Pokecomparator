import('./bootstrap')
	.catch(err => console.error(err));
	
// Inject SVG sprite into the document
fetch('/assets/ui/sprite.svg').then(r => r.text()).then(svg => {
  const container = document.createElement('div');
  container.style.display = 'none';
  container.innerHTML = svg;
  document.body.insertBefore(container, document.body.firstChild);
}).catch(()=>{/* silent fallback */});
