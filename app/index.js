import Taja from "./src/Taja";

const app = new Taja(document.querySelector('#hnctt'));
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
