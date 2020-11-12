import _ from "underscore";
import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import CompTurntable from "../../Framework/Components/CompTurntable";
import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";
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

  @property({ tooltip: "干脆面", type: cc.Label })
  lbSimplyFace: cc.Label = null;

  compTurntable: CompTurntable = null;

  isOpening: number = 0;

  @property({ tooltip: "干脆面节点", type: cc.Node })
  nodeSimplyFace: cc.Node = null;

  async onLoad() {
    this.eveList.push(["onShareAppMessage", this.onShareAppMessage.bind(this)]);
    await super.onLoad();
    this.btnClose.on("click", this.onClose, this);
    let scale = cc.winSize.width / 600;
    this.Turntable.setScale(scale);

    this.compTurntable = this.Turntable.getComponent(CompTurntable);
    this.compTurntable.registerFinshCallBack(this.finshResult.bind(this));

    this.refreshVidoCardCnt();
    this.refreshSimplyFaceCnt();
    this.eveList.push([
      "refeshSimplyFace",
      this.refreshSimplyFaceCnt.bind(this),
    ]);
  }

  finshResult(result) {
    g_global.msgSys.showPrompt("恭喜你抽中" + result + "位置的奖品");
  }
  onShareAppMessage() {
    this.doOpen(1);
  }
  onlookVido() {
    if (0 != this.isOpening) {
      return g_global.msgSys.showPrompt("正在开奖中,点击干脆面开奖");
    }

    if (!(g_global.dataManager.player as WaterMarginPlayer).isHaveVidoCard()) {
      return g_global.msgSys.showPrompt("今日视频卡已用尽请明天有送记得再来哦");
    }
    this.doOpen(1);
  }
  onShare() {
    var ret = {
      title: "最强水浒",
      imageUrl: "http://scpic.chinaz.net/files/pic/pic9/202011/bpic21698.jpg",
    };
    g_global.platform.doWxShare(ret);
  }
  onGold() {
    if (0 != this.isOpening) {
      return g_global.msgSys.showPrompt("正在开奖中,点击干脆面开奖");
    }
    let dataManager = g_global.dataManager as WaterMaiginDataManager;
    if (dataManager.mySimplyFaceCnt <= 0) {
      return g_global.msgSys.showPrompt("干脆面不够了");
    }
    this.doOpen(2);
  }
  refreshVidoCardCnt(vidoCardCnt?) {
    vidoCardCnt =
      vidoCardCnt ||
      (g_global.dataManager.player as WaterMarginPlayer).vidoCardCnt;
    this.lbVidoCntTip.string = `视频转盘次数${vidoCardCnt}次`; //
  }
  refreshSimplyFaceCnt(cnt?) {
    let dataManager = g_global.dataManager as WaterMaiginDataManager;
    this.lbSimplyFace.string = `我的干脆面(${dataManager.mySimplyFaceCnt}/${dataManager.simplyFaceMaxCnt})`;
  }
  getRandNum(min, max) {
    let randNum = _.random(min, max);
    return randNum;
  }
  //随机正负
  getRandZR() {
    let randNum = _.random(1, 10);
    return randNum <= 5 ? -1 : 1;
  }
  getRandV2(x, y) {
    return new cc.Vec2(
      x + this.getRandNum(1, 10) * this.getRandZR(),
      y + this.getRandNum(1, 10) * this.getRandZR()
    );
  }
  doOpen(type) {
    this.isOpening = type;
    let x = this.nodeSimplyFace.x;
    let y = this.nodeSimplyFace.y;
    let action = cc.repeatForever(
      cc.sequence(
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y)),
        cc.moveTo(0.018, this.getRandV2(x, y))
      )
    );
    this.nodeSimplyFace.runAction(action);
  }
  onClickOpen() {
    if (0 != this.isOpening) {
      this.nodeSimplyFace.stopAllActions();
      let dataManager = g_global.dataManager as WaterMaiginDataManager;
      if (1 == this.isOpening) {
        let vidoCardCnt = (g_global.dataManager
          .player as WaterMarginPlayer).consumeVidoCard();
        this.refreshVidoCardCnt(vidoCardCnt);
      } else if (2 == this.isOpening) {
        dataManager.reduceSimplyFace();
      }
      let randId = _.random(1, 109);
      dataManager.addCard(randId);

      let worldPostion = this.nodeSimplyFace.convertToWorldSpaceAR(cc.Vec2.ZERO);
      g_global.msgManager.show(EnumPrefab.MsgWaterMarginCardShow, {
        cardId: randId,
        worldPostion: worldPostion,
        size: this.nodeSimplyFace.getContentSize(),
      });

      this.isOpening = 0;
    }
  }
}
