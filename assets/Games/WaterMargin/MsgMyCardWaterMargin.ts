import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import g_global from "../../Script/GameGlobal";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MsgMyCardWaterMargin extends MsgFullScreen {
  @property({ tooltip: "我的热干面", type: cc.Node })
  MySimplyFace: cc.Node = null;
  @property({ tooltip: "我的卡册", type: cc.Node })
  MyCards: cc.Node = null;

  @property({ tooltip: "我的热干面", type: cc.Node })
  buttonSimplyFace: cc.Node = null;
  @property({ tooltip: "我的卡册", type: cc.Node })
  buttonCards: cc.Node = null;

  @property({ tooltip: "我的卡册", type: cc.Node })
  MyCardArea: cc.Node = null;


  async onLoad() {
    await super.onLoad();
    this.enterMySimplyFace();

    let button = this.buttonSimplyFace.getComponent(cc.Button);
    if (!button) {
      this.buttonSimplyFace.addComponent(cc.Button);
    }
    this.buttonSimplyFace.on("click", this.onClickMySimplyFace, this);


    if (!this.buttonCards.getComponent(cc.Button)) {
      this.buttonCards.addComponent(cc.Button);
    }
    this.buttonCards.on("click", this.onClickMyCards, this);


    if (!this.MyCardArea.getComponent(cc.Button)) {
      this.MyCardArea.addComponent(cc.Button);
    }
    this.MyCardArea.on("click", this.openTurntable, this);


  }
  enterMyCards() {
    this.buttonCards.color =new cc.Color(228,242,179,255);
    this.buttonSimplyFace.color = cc.Color.WHITE;
    this.MyCards.stopAllActions();
    this.MySimplyFace.stopAllActions();
    this.MyCards.runAction(cc.moveTo(0.4, cc.v2(0, 0)).easing(cc.easeSineOut()));
    this.MySimplyFace.runAction(cc.moveTo(0.4, cc.v2(-cc.winSize.width, 0)).easing(cc.easeSineOut()));
  }
  enterMySimplyFace() {
    this.buttonCards.color = cc.Color.WHITE;
    this.buttonSimplyFace.color=new cc.Color(228,242,179,255);
    this.MyCards.stopAllActions();
    this.MySimplyFace.stopAllActions();
    this.MySimplyFace.runAction(cc.moveTo(0.4, cc.v2(0, 0)).easing(cc.easeSineOut()));
    this.MyCards.runAction(cc.moveTo(0.4, cc.v2(cc.winSize.width, 0)).easing(cc.easeSineOut()));
  }

  onClickMyCards() {
    this.enterMyCards();
  }
  onClickMySimplyFace() {
    this.enterMySimplyFace();
  }

  openTurntable(){
    g_global.msgManager.show("MsgWaterMarginTurntable");
  }
}
