import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMargin extends cc.Component {
  async onLoad() {
    await (g_global.dataManager as WaterMaiginDataManager).init();
    g_global.msgManager.show(EnumPrefab.MsgMyCardWaterMargin);
    g_global.init();
  }

  onClick(){
    g_global.msgManager.show(EnumPrefab.MsgMyCardWaterMargin);
  }
}
