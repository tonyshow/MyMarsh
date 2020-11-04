import g_global from "../../Script/GameGlobal";

const {ccclass, property} = cc._decorator;
@ccclass
export default class WaterMargin extends cc.Component {
     onLoad () {
       g_global.msgManager.show("MsgMyCardWaterMargin");
     }
}
