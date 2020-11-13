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

  async onLoad() {
    this.loading.active = true;
    this.btnLogin.active = false;
    this.progressBar.progress = 0;
    this.progressBar.totalLength = this.progressBar.node.getContentSize().width;
    //let bundle = await g_global.platform.loadSubpackage("iconcard");
    //g_global.save("iconcard", bundle);

    //let cardMaxCnt =(g_global.dataManager as WaterMaiginDataManager).cardMaxCnt
    //for( let i=1;i<= cardMaxCnt;++i ){
    //  let sp = await this.loadRes( bundle,i )
    //  this.progressBar.progress = 0.3/cardMaxCnt*i;
    //  g_global.save("card"+ i , sp);
    //}
    //this.progressBar.progress = 0.3;
    //bundle = await g_global.platform.loadSubpackage("iconcardbg1");
    //g_global.save("iconcardbg1", bundle);
    //for( let i=1;i<55;++i ){
    //  let sp = await this.loadRes( bundle,i )
    //  this.progressBar.progress = 0.3+0.4/55*i;
    //  g_global.save("cardbg"+i, sp);
    //}
    //this.progressBar.progress = 0.7;

    //bundle = await g_global.platform.loadSubpackage("iconcardbg2");
    //g_global.save("iconcardbg2", bundle);
    //for( let i=55;i<=cardMaxCnt;++i ){
    //  let sp = await this.loadRes( bundle,i )
    //  this.progressBar.progress =0.7+0.3/(cardMaxCnt-55)*i;
    //  g_global.save("cardbg"+i, sp);
    //}

    this.progressBar.progress = 1;
    this.loading.active = false;
    this.btnLogin.active = true;
  }


  //加载
  loadRes(bundle,name){
    return new Promise<cc.SpriteFrame>((resolve, reject) => {
      bundle.load( name+"", cc.SpriteFrame, (error, sp: cc.SpriteFrame) => {
        if (!!error) {
          reject(error);
        } else {
          resolve(sp)
        }
      });
    })
  }

  async doLogin() {
    try {
      await g_global.platform.emitLogin();
      g_global.scene.goScene("WaterMargin");
    } catch (error) {
      g_global.msgSys.showPrompt("登录失败"+error);
    }
  }
}
