import CompTurntable from "../../Framework/Components/CompTurntable";
import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import g_global from "../../Script/GameGlobal";
import g_waterMargin from "./WaterMarginGlobal";
import WaterMarginPlayer from "./WaterMarginPlayer";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MsgWaterMarginTurntable extends MsgFullScreen {
  @property({ tooltip: "关闭", type: cc.Node })
  btnClose: cc.Node = null;

  @property({ tooltip: "转盘", type: cc.Node })
  Turntable: cc.Node = null;

  @property({ tooltip: "视频卡数量提示", type: cc.Label })
  lbVidoCntTip: cc.Label = null;

  compTurntable: CompTurntable = null;

  async onLoad() {
    await super.onLoad();
    this.btnClose.on("click", this.onClose, this);
    let scale = cc.winSize.width / 600;
    this.Turntable.setScale(scale);

    this.compTurntable = this.Turntable.getComponent(CompTurntable);
    this.compTurntable.registerFinshCallBack(this.finshResult.bind(this));

    this.refreshVidoCardCnt();
  }

  finshResult(result) {
    g_global.msgSys.showPrompt("恭喜你抽中" + result + "位置的奖品");
  }

  onlookVido() {
    if (!this.compTurntable.getIsCanTurn()) {
      return g_global.msgSys.showPrompt("正在开奖中");
    }
    if (
      !(g_waterMargin.dataManager.player as WaterMarginPlayer).isHaveVidoCard()
    ) {
      return g_global.msgSys.showPrompt("今日视频卡已用尽请明天有送记得再来哦");
    }
    let vidoCardCnt = (g_waterMargin.dataManager.player as WaterMarginPlayer).consumeVidoCard();
    this.refreshVidoCardCnt(vidoCardCnt);
    this.compTurntable.startTurn();
  }
  onGold() {
    if (!this.compTurntable.getIsCanTurn()) {
      return g_global.msgSys.showPrompt("正在开奖中");
    }
    if (!g_waterMargin.dataManager.player.isHaveMoeny()) {
      return g_global.msgSys.showPrompt("金币不足");
    }
    g_waterMargin.dataManager.player.consumeMoeny(100);
    this.compTurntable.startTurn();
  }
  refreshVidoCardCnt(vidoCardCnt?) {
    vidoCardCnt =
      vidoCardCnt ||
      (g_waterMargin.dataManager.player as WaterMarginPlayer).vidoCardCnt;
    this.lbVidoCntTip.string = `视频转盘次数${vidoCardCnt}次`; //
  }
}
