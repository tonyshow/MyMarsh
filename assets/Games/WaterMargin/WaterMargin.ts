import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import g_global from "../../Script/GameGlobal";

const {ccclass, property} = cc._decorator;
@ccclass
export default class WaterMargin extends cc.Component {
     onLoad () {
       g_global.msgManager.show(EnumPrefab.MsgMyCardWaterMargin);
     }
}
