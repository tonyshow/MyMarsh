import EnumScene from "../../Framework/Auto/EnumScene";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginLoading extends cc.Component {
  @property({ tooltip: "进度条", type: cc.ProgressBar })
  progressBar: cc.ProgressBar = null;

  @property({ tooltip: "loading", type: cc.Node })
  loading: cc.Node = null;

  @property({ tooltip: "btnLogin", type: cc.Node })
  btnLogin: cc.Node = null;

  wxBtn = null;
  async onLoad() {
    this.loading.active = true;
    this.btnLogin.active = false;
    this.progressBar.progress = 0;
    this.progressBar.totalLength = this.progressBar.node.getContentSize().width;
    this.progressBar.progress = 1;
    this.loading.active = false;
    this.btnLogin.active = true;
  }

  //加载
  loadRes(bundle, name) {
    return new Promise<cc.SpriteFrame>((resolve, reject) => {
      bundle.load(name + "", cc.SpriteFrame, (error, sp: cc.SpriteFrame) => {
        if (!!error) {
          reject(error);
        } else {
          resolve(sp);
        }
      });
    });
  }

  async doLogin() {
    try {
      let info =  await g_global.platform.authorize();
      ( g_global.dataManager as WaterMaiginDataManager).player.reset(info);
      g_global.scene.goScene("WaterMargin");
    } catch (error) {
      g_global.msgSys.showPrompt(error);
    }
  }
}
