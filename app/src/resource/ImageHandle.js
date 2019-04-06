/** Image loader and convertor for canvas */
class ImageHandle {
  /** Create ImageHandle */
  constructor (opt = {}) {
    this.ready = false;
    this._opt = opt;
    this._image = document.createElement('img');
    this._image.addEventListener('load', () => { this.ready = true; });

    if (this._opt.src) this._image.src = this._opt.src;
  }

  /**
   * async constructor (constructor + load)
   * @param {string} url - Image url
   * @returns {ImageHandle}
   */
  static async fromUrl(url) {
    const imageWrapper = new ImageHandle();
    return imageWrapper.load(url);
  }

  /**
   * Set and loading target image url
   * @param {string} url - Image url
   * @returns {Promise} Promise object represents the success of loading progress
   */
  load(url) {
    this.ready = false;

    return new Promise((resolve, reject) => {
      this._image.addEventListener('load', event => { resolve(this, event); });
      this._image.addEventListener('error', event => { reject(event); });
      this._image.src = url;
    });
  }

  /**
   * Set image's 0x00ff00(green) pixel to transparency
   */
  handleTransparency() {
    if (!this.ready) {
      throw new Error('ImageWrapper not ready');
    }

    const canvas = document.createElement('canvas');
    canvas.width = this._image.naturalWidth;
    canvas.height = this._image.naturalWidth;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(this._image, 0, 0);

    this.handledImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = this.handledImageData.data;
    for (var i = 0; i < data.length; i += 4) {
      if (data[i] === 0x0 && data[i+1] === 0xFF
        && data[i+2] === 0x0 && data[i+3] === 0xFF) {

        data[i] = 0x0;
        data[i+1] = 0x0;
        data[i+2] = 0x0;
        data[i+3] = 0x0;
      }
    }
  }

  /**
   * Draw image to target canvas context
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} x - Horizontal position (x coordinate) at which to place the image data in the destination canvas
   * @param {number} y -Vertical position (y coordinate) at which to place the image data in the destination canvas
   */
  draw(ctx, x, y) {
    if (this.handledImageData) {
      ctx.putImageData(this.handledImageData, x, y);
    } else {
      ctx.drawImage(this._image, x, y);
    }
  }
}

export default ImageHandle;
