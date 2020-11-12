import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import Interface from "../../Framework/Interface/Interface";
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

  async onLoad() {
    await super.onLoad();
    let button = this.node.getComponent(cc.Button);
    if (!button) {
      button = this.node.addComponent(cc.Button);
    }
    this.node.on("click", this.onClick, this);
    this.eveList.push(["addCard", this.refreshCard.bind(this)]);
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
      g_global.msgSys.showPrompt("未获得卡,赶紧去赚干脆面获得卡牌吧");
    }
  }

  setCardId(id) {
    this.id = id;
    let isHave = !(g_global.dataManager as WaterMaiginDataManager).getIsHaveCard(
      this.id
    );
    this.iconSp.spriteFrame = g_global.getByKey("card" + this.id);
    this.setGray(isHave);
  }

  setGray(isGray: boolean = false) {
    this.iconSp.setMaterial(
      0,
      !!isGray ? this.grayMaterial : this.spriteMaterial
    );
  }

  refreshCard(id) {
    if (this.id === id) {
      this.setGray(false);
    }
  }
}