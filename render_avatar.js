var Webpage = require('webpage'), 
    fs = require('fs');
var names, count;

names = phantom.args.slice();

count = names.length; 
pages = [];

function renderPage(name, page) {
  var ready = page.evaluate(function() {
    return document.renderReady;
  });
  
  if (!ready) {
    setTimeout(renderPage, 100, name, page);
    return;
  }

  page.render('out' + fs.separator + name + '.png');
  
  if (!--count) {
    phantom.exit();
  } else {
    setTimeout(render, 1, names.pop());
  }
}

function render(name) {
  var page = Webpage.create()
    , path = 'file://' + fs.workingDirectory + fs.separator + 'src' + fs.separator + 'avatar.svg?' + name;

  page.viewportSize = { width: 320, height: 320 };
  page.open(path, function() { renderPage(name, page); });
}

render(names.pop());
