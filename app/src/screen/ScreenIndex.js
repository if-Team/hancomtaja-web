import ScreenMain from "./ScreenMain";
import ImageHandle from '../resource/ImageHandle';
import ImageSplash from "../../images/info/splash.png";
import Screen from './Screen';

/** Taja's initialize screen */
class ScreenIndex extends Screen {
  /**
   * Create ScreenIndex
   * @param {Taja} taja - Main context
   * @param {Object} profile - Current user's profile
   */
  constructor(taja, profile) {
    super(taja, profile);
  }

  /**
   * Fire when this screen being initialized
   * @override
   */
  async onCreate () {}

  /**
   * Fire when this screen appear screen
   * @override
   */
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

  /**
  * Draw screen
   * @override
   * @param {number} delta
   * @param {CanvasRenderingContext2D} ctx
   */
  draw (delta, ctx) {
    const loadingImage = this.resources.splash;
    loadingImage.draw(ctx, (800 - loadingImage.width) / 2, (600 - loadingImage.height) / 2);
  }

  /**
   * Fire when this screen disappear screen
   * @override
   */
  async onHide () {}

  /**
   * Get screen's resources
   * @returns {Object}
   */
  get _resources() {
    return {
      splash: ImageSplash
    };
  }
}

module.exports = ScreenIndex;
