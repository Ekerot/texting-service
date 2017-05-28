'use strict';

const RaspiCam = require('raspicam');

module.exports.snap = () => {
  return new Promise((resolve, reject) => {
    const currTime = new Date().getTime();
    const encoding = 'jpg';
    const mode = 'photo';

    const opts = {
      mode,
      encoding,
      quality: 50,
      width: 450,
      height: 450,
      timeout: 1000,
      output: '/home/pi/project-group-A/src/server/images/' + currTime + '.' + encoding,
      rot: 90,
      ev: -1
    };

    const camera = new RaspiCam(opts);

    try {
      camera.start();
    } catch (error) {
      reject(error);
    }

    camera.on('exit', () => {
      resolve(currTime);
    });
  });
};
