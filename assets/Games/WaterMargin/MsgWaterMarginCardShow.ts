import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import UtilsCCC from "../../Framework/Utils/UtilsCCC";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MsgWaterMarginCardShow extends MsgFullScreen {
  id = 0;
  worldPostion = null;
  size = null;
  @property({ tooltip: "icon", type: cc.Sprite })
  iconSp: cc.Sprite = null;

  @property({ tooltip: "正常材质", type: cc.Material })
  spriteMaterial: cc.Material = null;

  @property({ tooltip: "灰色材质", type: cc.Material })
  grayMaterial: cc.Material = null;

  @property({ tooltip: "等级材质", type: [cc.Material] })
  leveMaterials: cc.Material[] = Array<cc.Material>();

  @property({ tooltip: "升级品质按钮", type: cc.Node })
  btnUpLevel: cc.Node = null;

  isSwitchFinsh = false;
  isGray = false;
  cardSpriteFrame = null;
  cardBfSpriteFame = null;
  isActioning: boolean = false; //是否正在播放动画
  start() {
    if (!!this.data.worldPostion) {
      let bfPos = this.iconSp.node.getPosition();
      let newPostion = this.iconSp.node.parent.convertToNodeSpaceAR(
        this.data.worldPostion
      );
      this.iconSp.node.setPosition(newPostion);
      let scale =
        this.data.size.width / this.iconSp.node.getContentSize().width;
      this.iconSp.node.setScale(scale, scale);
      let act = cc.spawn([
        cc.scaleTo(0.3, 1, 1).easing(cc.easeBackInOut()),
        cc.moveTo(0.3, bfPos).easing(cc.easeBackInOut()),
      ]);
      this.isActioning = true;
      let acts = cc.sequence([
        act,
        cc.callFunc(() => {
          this.isActioning = false;
        }),
      ]);
      this.iconSp.node.runAction(acts);
    }
  }

  async onLoad() {
    await super.onLoad();
    let button = this.node.getComponent(cc.Button);
    if (!button) {
      button = this.node.addComponent(cc.Button);
    }
    this.node.on("click", this.onClick, this);

    this.cardBfSpriteFame = await UtilsCCC.getSpriteFrameByBundle(
      this.id + "",
      ["iconcardbg1", "iconcardbg2"]
    );
  }
  onClick() {
    this.onClose();
  }

  refreshCard(isGray: boolean = false) {
    this.isGray = isGray;
    let level = (g_global.dataManager as WaterMaiginDataManager).getCardLevel(
      this.id
    );
    this.iconSp.setMaterial(0, this.leveMaterials[level]);

    this.btnUpLevel.active = !(g_global.dataManager as WaterMaiginDataManager).isMaxCardLevel(
      this.id
    )
  }

  async onClickCard() {
    if (!!this.isActioning) {
      return;
    }
    this.iconSp.node.stopAllActions();
    this.isActioning = true;
    if (!this.cardBfSpriteFame) {
      this.cardBfSpriteFame = await UtilsCCC.getSpriteFrameByBundle(
        this.id + "",
        ["iconcardbg1", "iconcardbg2"]
      );
    }
    let act = cc.sequence([
      cc.scaleTo(0.3, 0, 0.8).easing(cc.easeBackIn()),
      cc.callFunc(() => {
        if (!!this.isGray) {
          this.grayMaterial.setProperty(`x_count`, 200);
          this.grayMaterial.setProperty(`y_count`, 200);
        }
        this.switchBg();
      }),
      cc.scaleTo(0.2, 1, 1).easing(cc.easeBackOut()),
      cc.callFunc(() => {
        this.isActioning = false;
      }),
    ]);
    this.iconSp.node.runAction(act);
  }
  async switchBg() {
    this.isSwitchFinsh = this.isSwitchFinsh ? false : true;
    this.iconSp.spriteFrame = this.isSwitchFinsh
      ? this.cardSpriteFrame
      : this.cardBfSpriteFame;
  }
  async setCardId(id, worldPostion?: cc.Vec2, size?: cc.Size) {
    this.id = id;
    let isHave = !(g_global.dataManager as WaterMaiginDataManager).getIsHaveCard(
      this.id
    );
    this.refreshCard(isHave);
    this.cardSpriteFrame = await UtilsCCC.getSpriteFrameByBundle(
      this.id + "",
      "iconcard"
    );
    this.iconSp.spriteFrame = this.cardSpriteFrame;
    this.isSwitchFinsh = true;
  }

  setData(data) {
    super.setData(data);
    this.setCardId(data.cardId, data.worldPostion, data.size);
  }

  onUpLevel() {
    let isCanUp = (g_global.dataManager as WaterMaiginDataManager).getIsCanUpLevel(
      this.id
    );
    if (!!isCanUp) {
      let newLevel = (g_global.dataManager as WaterMaiginDataManager).doUpLevelCard(
        this.id
      );
      this.refreshCard(true);
      g_global.msgSys.showPrompt(`成功升级至${newLevel}级`);
    } else {
      let needCnt = (g_global.dataManager as WaterMaiginDataManager).needCardCanUp(
        this.id
      );
      if (
        !(g_global.dataManager as WaterMaiginDataManager).isMaxCardLevel(
          this.id
        )
      ) {
        g_global.msgSys.showConfirm({
          txt: `还差${needCnt}张就可以升级更高品质,邀请好友获取更多卡牌`,
          right: {
            btnTxt: "邀请助力",
            btnCb: () => {
              let dataManager = g_global.dataManager as WaterMaiginDataManager;
              g_global.platform.doWxShare(dataManager.getShareInfo(),"MsgWaterMarginCardShow");
            },
          },
        });
      }
    }
  }
}
