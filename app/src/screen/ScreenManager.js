import ImageHandle from "../resource/ImageHandle";

class ScreenManager {
  constructor(hnctt) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    
    this.root = hnctt;
    this.root.appendChild(this.canvas);

    this.screen = null;
  }

  draw() {
    if(this.screen) {
      this.screen.draw(this.ctx);
    }
  }

  async initScreen(screen) {
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

    await screen.init();

    this.screen = screen;
  }
}

export default ScreenManager;
