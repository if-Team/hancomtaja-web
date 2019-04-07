import ScreenMain from "./ScreenMain";
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

  async onShow () {
    (async () => {
      const loadStartAt = Date.now();
      // Loading another screens
      await this.app.manager.registerScreen('main', ScreenMain);
      // await this.manager.registerScreen('practiceLocation', ScreenPracticeLocation);
      // await this.manager.registerScreen('practiceWord', ScreenPracticeWord);
      // await this.manager.registerScreen('practiceShort', ScreenPracticeShort);
      // ...

      // Minimum time for splash image
      const leftover = (loadStartAt + 3000) - Date.now();
      if (leftover > 0) {
        setTimeout(() => {
          this.app.manager.changeScreen('main').catch(err => {
            // TODO: use global trap
            console.error(err);
          });
        }, leftover);
      } else await this.app.manager.changeScreen('main');
    })().catch(err => {
      // TODO: use global trap
        console.error(err);
    });
  }

  async onHide () {}

  get _resources() {
    return {
      splash: ImageSplash
    };
  }
}

module.exports = ScreenIndex;
