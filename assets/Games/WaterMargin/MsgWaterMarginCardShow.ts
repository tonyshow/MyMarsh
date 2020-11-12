import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
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

  isSwitchFinsh = false;
  isGray = false;
  start() {
    if (!!this.data.worldPostion) {
      let bfPos = this.iconSp.node.getPosition();
      let newPostion = this.iconSp.node.parent.convertToNodeSpaceAR(
        this.data.worldPostion
      );
      this.iconSp.node.setPosition(newPostion);
      let scale = this.data.size.width / this.iconSp.node.getContentSize().width
      this.iconSp.node.setScale(scale, scale);
      let act = cc.spawn([
        cc.scaleTo(0.3, 1, 1).easing(cc.easeBackInOut()),
        cc.moveTo(0.3, bfPos).easing(cc.easeBackInOut()),
      ]);
      this.iconSp.node.runAction(act);
    }
  }

  async onLoad() {
    await super.onLoad();
    let button = this.node.getComponent(cc.Button);
    if (!button) {
      button = this.node.addComponent(cc.Button);
    }
    this.node.on("click", this.onClick, this);
  }
  onClick() {
    this.onClose();
  }

  setGray(isGray: boolean = false) {
    this.isGray = isGray;
    if (!!isGray) {
      this.grayMaterial.setProperty(`x_count`, 100);
      this.grayMaterial.setProperty(`y_count`, 100);
    }
    this.iconSp.setMaterial(
      0,
      !!isGray ? this.grayMaterial : this.spriteMaterial
    );
  }

  onClickCard() {
    this.iconSp.node.stopAllActions();
    let act = cc.sequence([
      cc.scaleTo(0.3, 0, 0.8).easing(cc.easeBackIn()),
      cc.callFunc(() => {
        if (!!this.isGray) {
          this.grayMaterial.setProperty(`x_count`, 200);
          this.grayMaterial.setProperty(`y_count`, 200);
        }
        this.isSwitchFinsh = this.isSwitchFinsh ? false : true;
        this.iconSp.spriteFrame = g_global.getByKey(
          (this.isSwitchFinsh ? "card" : "cardbg") + this.id
        );
      }),
      ,
      cc.scaleTo(0.2, 1, 1).easing(cc.easeBackOut()),
    ]);

    //easeExponentialInOut
    this.iconSp.node.runAction(act);
  }

  setCardId(id, worldPostion?: cc.Vec2, size?: cc.Size) {
    this.id = id;
    let isHave = !(g_global.dataManager as WaterMaiginDataManager).getIsHaveCard(
      this.id
    );
    this.setGray(isHave);
    this.iconSp.spriteFrame = g_global.getByKey("card" + this.id);
    this.isSwitchFinsh = true;
    //let bfPos =  this.iconSp.node.getPosition()
    //if(!!worldPostion){
    //  let newPostion =  this.iconSp.node.parent.convertToNodeSpaceAR(worldPostion)
    //  this.iconSp.node.setPosition(newPostion)
    //  cc.log( newPostion.x,newPostion.y)
    //  cc.log( this.iconSp.node.getPosition().x,this.iconSp.node.getPosition().y)
    //  this.iconSp.node.setScale(0.5,0.5)
    //}
    //this.iconSp.node.setScale(0.1,0.1)

    //let act = cc.spawn( [ cc.sequence([cc.scaleTo(0.1,0,0.5),cc.scaleTo(0.1,1,1)]) , cc.moveTo(1*0.08,bfPos) ] )
    //this.iconSp.node.runAction(act)
  }

  setData(data) {
    super.setData(data);
    this.setCardId(data.cardId, data.worldPostion, data.size);
  }
  update() {
    //let newPostion = this.iconSp.node.parent.convertToNodeSpaceAR(
    //  this.data.worldPostion
    //);
    ////cc.log( newPostion.x,newPostion.y)
    //this.iconSp.node.setPosition(newPostion);
  }
}
