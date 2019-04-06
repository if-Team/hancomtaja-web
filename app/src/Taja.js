import 'babel-polyfill';
import ScreenIndex from './screen/ScreenIndex';
import ScreenMain from './screen/ScreenMain';

const isDev = ('' + process.env.NODE_ENV).toLowerCase() !== 'production';

/** Main Hancom Taja class */
class Taja {
  /** Create Taja instance */
  constructor() {
    this.isDev = isDev;

    this.screens = {};
    this.currentScreenName = null;

    this.containerElement = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this._bindedDoTick = this._doTick.bind(this);
    this.pauseTicking = false;
  }

  /** async init function */
  async init() {
    Object.assign(this.containerElement.style, {
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

    this.canvas.width = 800;
    this.canvas.height = 600;

    this.containerElement.appendChild(this.canvas);
    document.body.appendChild(this.containerElement);

    this.screens.index = new ScreenIndex(this);
    this.screens.main = new ScreenMain(this);

    await this.changeScreen('index');
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
  async changeScreen(name) {
    if (!this.screens[name])
      throw new Error('Unknown screen name: ' + name);
    this.pauseTicking = true;
    if (this.currentScreenName) await this.screen.onHide();
    this.currentScreenName = name;
    await this.screen.onShow();
    this.pauseTicking = false;
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
    if (!this.pauseTicking) this.screen.draw(delta, this.ctx);
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
