import ImageHandle from "../resource/ImageHandle";
import ScreenMain from "./ScreenMain";


class ScreenManager {
  /** Create ScreenManager instance */
  constructor(taja, elem) {
    this.isDev = taja.isDev;

    this.app = taja;
    this.screens = {};
    this.currentScreenName = null;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');

    this.root = elem;
    this.root.appendChild(this.canvas);

    this._bindedDoTick = this._doTick.bind(this);
  }

  /** async init function */
  async init() {
    this.startAnimationFrame();
  }

  /** Get current screen */
  get screen() {
    return this.screens[this.currentScreenName];
  }

  async registerScreen(name, Screen, ...args) {
    const screen = new Screen(this.app, ...args);

    const resources = screen._resources;
    const loadedResources = await Promise.all(
      Object.keys(resources).map(
        async k => [k, await ImageHandle.fromUrl(resources[k])]
      )
    );

    screen.resources = loadedResources.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    await screen.onCreate();

    this.screens[name] = screen;
  }

  /**
   * Change Taja instance's screen
   * @param {string} name - Screen name
   */
  async changeScreen(name) {
    if (!this.screens[name])
      throw new Error('Unknown screen name: ' + name);
    if (this.currentScreenName) await this.screen.onHide();
    this.currentScreenName = name;
    await this.screen.onShow();
  }

  /** Start ticking */
  startAnimationFrame() {
    window.requestAnimationFrame(this._bindedDoTick);
  }

  /** Stop ticking */
  stopAnimationFrame() {
    window.cancelAnimationFrame(this._bindedDoTick);
  }

  /** fired by AnimationFrame */
  _doTick(delta) {
    this.startAnimationFrame();
    this.screen.draw(delta, this.ctx);
  }
}

export default ScreenManager;
