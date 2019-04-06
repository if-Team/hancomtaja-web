const Screen = require('./Screen');
const ImageHandle = require('../resource/ImageHandle');

const ImagesInfo174 = require('../../images/info/174.bmp');

/** Taja's initialize screen */
class ScreenIndex extends Screen {
  constructor(taja, profile) {
    super(taja, profile);
  }

  draw (delta, ctx) {
    this.loadingImage.draw(ctx, (800-this.loadingImage.width)/2, (600-this.loadingImage.height)/2);
  }

  async onShow () {
    this.loadingImage = await ImageHandle.fromUrl(ImagesInfo174);
    // TODO: load something
  }

  async onHide () {

  }
}

module.exports = ScreenIndex;
