import ScreenMain from "./screen/ScreenMain";
import ScreenManager from "./screen/ScreenManager";

class Taja {
  constructor(elem) {
    this.isDev = ('' + process.env.NODE_ENV).toLowerCase() !== 'production';
    this.manager = new ScreenManager(this, elem);
  }

  async init() {
    await this.manager.registerScreen('index', ScreenIndex);
    await this.manager.registerScreen('main', ScreenMain);
    await this.manager.changeScreen('index');
    await this.manager.init();
  }
}

export default Taja;
