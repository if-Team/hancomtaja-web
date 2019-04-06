import ScreenMain from "./src/screen/ScreenMain";
import ScreenManager from "./src/screen/ScreenManager";

const main = new ScreenMain();
const manager = new ScreenManager(document.querySelector('#hnctt'), main);
manager.initScreen(main).then(() => manager.draw());
