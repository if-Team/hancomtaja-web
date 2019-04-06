/** abstract class of all screen class */
class Screen {
  /** Do not use this directly */
  constructor (taja) {
    this.taja = taja;
    this.local = {};
    this.resources = {};
  }

  /**
   * Override this method
   * @param {number} delta
   * @param {CanvasRenderingContext2D} ctx
   */
  draw (delta, ctx) {}

  /** Override this method */
  async onCreate () {}

  /** Override this method */
  async onShow () {}

  /** Override this method */
  async onHide () {}

  /** Override this method */
  get _resources() {
    return {};
  }
}

module.exports = Screen;
