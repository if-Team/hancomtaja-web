import Images from "../../images/screen/main/*.png";
import Screen from './Screen';

class ScreenMain extends Screen {
  constructor() {
    super();
    this.profile = null;
  }

  async init(profile) {
    this.profile = profile;
  }

  draw(ctx) {
    this.resources.main.draw(ctx, 0, 0);
  }

  async destroy() {

  }

  get _resources() {
    return Images;
  }
}

export default ScreenMain;
