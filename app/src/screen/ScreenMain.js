import Images from "../../images/screen/main/*.png";
import Screen from './Screen';

/** Taja's index screen */
class ScreenMain extends Screen {
  /**
   * Create ScreenMain
   * @param {Taja} taja - Main context
   */
  constructor(taja) {
    super();
  }

  /**
   * Fire when this screen being initialized
   * @override
   */
  async onCreate () {

  }

  /**
   * Fire when this screen appear screen
   * @override
   */
  async onShow() {

  }

  /**
  * Draw screen
   * @override
   * @param {number} delta
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(delta, ctx) {
    this.resources.main.draw(ctx, 0, 0);
  }

  /**
   * Fire when this screen disappear screen
   * @override
   */
  async onHide() {

  }

  get _resources() {
    return Images;
  }
}

export default ScreenMain;
