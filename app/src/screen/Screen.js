class Screen {
  constructor () {
    this.resources = {};
  }

  draw(ctx) {}
  async init() {}
  async destroy() {}
  get _resources() {
    return {};
  }
}

module.exports = Screen;
