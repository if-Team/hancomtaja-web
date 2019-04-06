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
    Object.assign(this.canvas.style, {
      width: '100%',
      paddingTop: '75%', // 4:3 aspect ratio
      paddingBottom: '75%',
      maxWidth: '800px',
      maxHeight: '600px'
    });
    this.ctx = this.canvas.getContext('2d');

    this.root = elem;
    this.root.appendChild(this.canvas);
    Object.assign(this.root.style, {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
    });

    this._bindedDoTick = this._doTick.bind(this);
    this.pauseTicking = false;
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
    if(!this.pauseTicking) this.screen.draw(delta, this.ctx);
  }
}

export default ScreenManager;
