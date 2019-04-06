import 'babel-polyfill';
import ScreenMain from './screen/ScreenMain.js';

const isDev = ('' + process.env.NODE_ENV).toLowerCase() !== 'production';

/** Main Hancom Taja class */
class Taja {
  /** Create Taja instance */
  constructor() {
    this.isDev = isDev;

    this.screens = {};
    this.currentScreenName = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this._bindedDoTick = this._doTick.bind(this);
  }

  /** async init function */
  async init() {
    document.body.appendChild(this.canvas);
    this.screens.main = new ScreenMain(this);
    this.changeScreen('main');
    this.startAnimationFrame();
  }

  /** Get current screen */
  get screen() {
    return this.screens[this.currentScreenName];
  }

  /**
   * Change Taja instance's screen
   * @param {string} name - Screen name
   */
  // TODO: need asnyc?
  changeScreen(name) {
    if (!this.screens[name])
      throw new Error('Unknown screen name: ' + name);
    if (this.currentScreenName) this.screen.onHide();
    this.currentScreenName = name;
    this.screen.onShow();
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

const app = new Taja();
app.init().catch(err => {
  console.error('UNHANDLED ERROR OCCUR:', err);
  if (!app.isDev) {
    prompt('예기치 못한 에러가 발생\n'
      + 'https://github.com/if-Team/hancomtaja-web/issues\n'
      + '에 해당 내용을 보고해주시면 감사하겠습니다.', err.message);
  }
});

if (app.isDev) {
  // for development perpose
  window.app = app;
}
