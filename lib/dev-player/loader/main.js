

var app;

function play () {
  var socket = io();
  socket.on('refresh', function () {
    reload();
  });
  reload();
  return new Promise(function () {});
}

function reload () {
  if (app) {
    app.abort();
    app = null;
  }
  getConfig().then(function (config) {
    var options = {
      template: '6be5bd3d-14dc-4a4d-a26a-a96c6538e062',
      duration: 24 * 3600 * 1000,
      config: config
    };
    exp.player.load(options).then(function (app_) {
      app = app_;
      app_.play();
    });
  });
}


function getConfig () {
  var xhr = new XMLHttpRequest();
  return new Promise(function (resolve) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText).config);
        } catch (error) {
          console.log('Failed to parse manifest.');
        }
      }
      resolve({});
    }
    xhr.open('GET', '/apps/6be5bd3d-14dc-4a4d-a26a-a96c6538e062/manifest.json');
    xhr.send();
  });
}
