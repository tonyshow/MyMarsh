import _ from "underscore";
import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import EnumPrompt from "../../Framework/Interface/EnumPrompt";
import Interface from "../../Framework/Interface/Interface";
import UtilsCCC from "../../Framework/Utils/UtilsCCC";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginCard extends Interface {
  id = 0;
  @property({ tooltip: "icon", type: cc.Sprite })
  iconSp: cc.Sprite = null;

  @property({ tooltip: "正常材质", type: cc.Material })
  spriteMaterial: cc.Material = null;

  @property({ tooltip: "灰色材质", type: cc.Material })
  grayMaterial: cc.Material = null;

  @property({ tooltip: "等级材质", type: [cc.Material] })
  leveMaterials: cc.Material[] = Array<cc.Material>();

  @property({ tooltip: "卡牌数量", type: cc.Node })
  cardCntNode: cc.Node = null;

  @property({ tooltip: "卡牌数量", type: cc.Label })
  cardCntLabel: cc.Label = null;

  @property({ tooltip: "等级", type: cc.Label })
  cardLevelLabel: cc.Label = null;

  @property({ tooltip: "等级", type: cc.Node })
  cardLevelNode: cc.Node = null;

  @property({ tooltip: "升级特效", type: cc.Node })
  upEffect: cc.Node = null;

  @property({ tooltip: "赤橙黄绿青蓝紫rgb值", type: [cc.Color] })
  colors: cc.Color[] = Array<cc.Color>();

  async onLoad() {
    this.cardCntNode.active = false;
    this.cardLevelNode.active = false;
    this.upEffect.active = false;
    await super.onLoad();
    let button = this.node.getComponent(cc.Button);
    if (!button) {
      button = this.node.addComponent(cc.Button);
    }
    this.node.on("click", this.onClick, this);
    this.eveList.push(["addCard", this.refreshCard.bind(this)]);
    this.eveList.push(["onShareAppMessage", this.onShareAppMessage.bind(this)]);
  }
  onShareAppMessage(defalurInfo){
    if('WaterMarginCard'==defalurInfo){
      g_global.msgSys.showPrompt({txt:"邀请好友,成功获得干脆面!!!",type:EnumPrompt.NONE})
    }
  }
  onClick(eve) {
    let isHave = (g_global.dataManager as WaterMaiginDataManager).getIsHaveCard(
      this.id
    );
    if (true == isHave) {
      let worldPostion = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
      g_global.msgManager.show(EnumPrefab.MsgWaterMarginCardShow, {
        cardId: this.id,
        worldPostion: worldPostion,
        size: this.node.getContentSize(),
      });
    } else {
      g_global.msgSys.showConfirm({
        txt: "未获得卡,赶紧去赚干脆面获得卡牌吧",
        right: {
          btnTxt: "立即邀请",
          btnCb: () => {
            let dataManager = g_global.dataManager as WaterMaiginDataManager;
            g_global.platform.doWxShare(dataManager.getShareInfo(),"WaterMarginCard");
          },
        },
      });
    }
  }

  async setCardId(id) {
    let cnt = (g_global.dataManager as WaterMaiginDataManager).getCardCnt(id);
    this.cardCntLabel.string = cnt.toString();

    this.id = id;
    let isHave = !(g_global.dataManager as WaterMaiginDataManager).getIsHaveCard(
      this.id
    );
    this.iconSp.spriteFrame = await UtilsCCC.getSpriteFrameByBundle(
      this.id + "",
      "iconcard"
    );
    this.setGray(isHave);
  }

  setGray(isGray: boolean = false) {
    let level = (g_global.dataManager as WaterMaiginDataManager).getCardLevel(
      this.id
    );
    this.iconSp.setMaterial(0, this.leveMaterials[level]);
    //this.cardCntNode.active = !isGray;
    this.cardLevelNode.active = !isGray;
    this.refreshLevel(this.id);
    let isCanUpLevel = (g_global.dataManager as WaterMaiginDataManager).getIsCanUpLevel(
      this.id
    );
    if (!!isCanUpLevel) {
      this.openUpEffect();
    } else {
      this.closeEffect();
    }
  }
  refreshCard(id) {
    if (this.id === id) {
      this.setGray(false);
      let cnt = (g_global.dataManager as WaterMaiginDataManager).getCardCnt(id);
      this.cardCntLabel.string = cnt.toString();
      this.refreshLevel(id);
    }
  }

  refreshLevel(id) {
    if (this.id === id) {
      this.upEffect.active = true;
      let level = (g_global.dataManager as WaterMaiginDataManager).getCardLevel(id);
      this.cardLevelLabel.string = level.toString();
      this.upEffect.color = this.colors[level];
    }
  }

  openUpEffect() {
    this.upEffect.active = true;
    let act = cc.sequence(cc.fadeOut(0.6), cc.fadeIn(0.6));
    this.upEffect.runAction(cc.repeatForever(act));
  }
  closeEffect() {
    this.upEffect.stopAllActions();
  }
}
