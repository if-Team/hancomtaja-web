import ImageHandle from '../resource/ImageHandle';
import ImageSplash from "../../images/info/splash.png";
import Screen from './Screen';

/** Taja's initialize screen */
class ScreenIndex extends Screen {
  constructor(taja, profile) {
    super(taja, profile);
  }

  draw (delta, ctx) {
    const loadingImage = this.resources.splash;
    loadingImage.draw(ctx, (800 - loadingImage.width) / 2, (600 - loadingImage.height) / 2);
  }

  async onCreate () {}

  async onShow () {}

  async onHide () {}

  get _resources() {
    return {
      splash: ImageSplash
    };
  }
}

module.exports = ScreenIndex;
