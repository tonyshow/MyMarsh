import Scene from "../../Framework/Interface/Scene/Scene";
import g_global from "../../Script/GameGlobal";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginLogin extends Scene {
   async onLogin() {
    await g_global.platform.login();
  }
}
