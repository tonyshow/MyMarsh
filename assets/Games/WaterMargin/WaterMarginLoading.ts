import EnumScene from "../../Framework/Auto/EnumScene";
import g_global from "../../Script/GameGlobal";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginLoading extends cc.Component {
  @property({ tooltip: "进度条", type: cc.ProgressBar })
  progressBar: cc.ProgressBar = null;

  @property({ tooltip: "loading", type: cc.Node })
  loading: cc.Node = null;

  @property({ tooltip: "btnLogin", type: cc.Node })
  btnLogin: cc.Node = null;

  async onLoad() {
    cc.log("开始架子");
    this.loading.active = true;
    this.btnLogin.active = false;
    this.progressBar.progress = 0;
    this.progressBar.totalLength = this.progressBar.node.getContentSize().width;
    let bundle = await g_global.platform.loadSubpackage("iconcard");
    g_global.save("iconcard", bundle);
    this.progressBar.progress = 0.3;
    bundle = await g_global.platform.loadSubpackage("iconcardbg1");
    g_global.save("iconcardbg1", bundle);
    this.progressBar.progress = 0.7;
    bundle = await g_global.platform.loadSubpackage("iconcardbg2");
    g_global.save("iconcardbg2", bundle);
    this.progressBar.progress = 1;
    this.loading.active = false;
    this.btnLogin.active = true;
  }

  async doLogin() {
    try {
      await g_global.platform.login();
      g_global.scene.goScene("WaterMargin");
    } catch (error) {
      g_global.msgSys.showPrompt("登录失败"+error);
    }
  }
}
