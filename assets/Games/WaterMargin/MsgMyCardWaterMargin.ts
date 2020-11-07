import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import CompGrid from "../../Framework/Components/CompGrid";
import CompPageView from "../../Framework/Components/CompPageView";
import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import ResUtil from "../../Framework/Manager/ResManager/ResUtil";
import g_global from "../../Script/GameGlobal";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MsgMyCardWaterMargin extends MsgFullScreen {
  @property({ tooltip: "我的热干面", type: cc.Node })
  MySimplyFace: cc.Node = null;
  @property({ tooltip: "我的卡册", type: cc.Node })
  MyCards: cc.Node = null;

  @property({ tooltip: "我的热干面按钮", type: cc.Node })
  buttonSimplyFace: cc.Node = null;
  @property({ tooltip: "我的卡册按钮", type: cc.Node })
  buttonCards: cc.Node = null;

  @property({ tooltip: "我的热干面区域", type: cc.Node })
  MyCardArea: cc.Node = null;

  @property({ tooltip: "热干面预制体", type: cc.Enum(EnumPrefab) })
  enumPrefab = EnumPrefab.NONE;

  @property({ tooltip: "我的卡册", type: cc.Node })
  pageView: cc.Node = null;


  @property({ tooltip: "我的卡册", type: CompGrid })
  compGrid: CompGrid = null;


  @property({ tooltip: "我的卡册PageView", type: CompPageView })
  myCardPageView: CompPageView = null;


  async onLoad() {
    await super.onLoad();
    this.enterMySimplyFace();
    //this.enterMyCards()
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

    let selfsize = this.node.getContentSize()
    this.MySimplyFace.setContentSize(new cc.Size(cc.winSize.width,selfsize.height));
    this.MyCards.setContentSize(selfsize);
    this.pageView.setContentSize(selfsize);


    for(let i = 0 ; i <8;++i){
      if(i == 0 ){
        let tempSize = this.MyCardArea.getContentSize()
        this.compGrid.setSelfSize(tempSize)
        this.compGrid.setItemSize(new cc.Size(selfsize.width/4,tempSize.height/2))
      }
      let simplyFaceNode = await ResUtil.getNodeByEnumPrefab(this.enumPrefab);
      simplyFaceNode.setContentSize(this.compGrid.getItemSize())
      this.MyCardArea.addChild( simplyFaceNode )
      simplyFaceNode.setPosition(this.compGrid.getPosition())

      this.myCardPageView.addPage();
    }


  }
  enterMyCards() {
    this.buttonCards.setScale(1.06);
    this.buttonSimplyFace.setScale(1);
    this.MyCards.stopAllActions();
    this.MySimplyFace.stopAllActions();
    this.MyCards.runAction(cc.moveTo(0.4, cc.v2(0, 0)).easing(cc.easeSineOut()));
    this.MySimplyFace.runAction(cc.moveTo(0.4, cc.v2(-cc.winSize.width, 0)).easing(cc.easeSineOut()));
  }
  enterMySimplyFace() {
    this.buttonSimplyFace.setScale(1.06);
    this.buttonCards.setScale(1);
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

  onClickArrowLeft() {
    this.myCardPageView.scrollLeft();
  }
  onClickArrowRight() {
    this.myCardPageView.scrollRight();
  }

  openTurntable(){
    g_global.msgManager.show(EnumPrefab.MsgWaterMarginTurntable);
  }
}
