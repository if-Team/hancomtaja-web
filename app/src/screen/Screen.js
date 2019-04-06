/** abstract class of all screen class */
class Screen {
  /** Do not use this directly */
  constructor (taja, profile) {
    this.taja = taja;
    this.profile = profile;
    this.local = {};
  }

  /**
   * Override this method
   * @param {number} delta
   * @param {CanvasRenderingContext2D} ctx
   */
  draw (delta, ctx) {}

  /** Override this method */
  async onShow () {}

  /** Override this method */
  async onHide () {}
}

module.exports = Screen;
