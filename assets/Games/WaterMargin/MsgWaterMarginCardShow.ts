import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";

const {ccclass, property} = cc._decorator;
@ccclass
export default class MsgWaterMarginCardShow extends MsgFullScreen {
  id=0;
  @property({ tooltip: "icon", type: cc.Sprite })
  iconSp: cc.Sprite = null;

  @property({ tooltip: "正常材质", type: cc.Material })
  spriteMaterial: cc.Material = null;

  @property({ tooltip: "灰色材质", type: cc.Material })
  grayMaterial: cc.Material = null;

  isSwitchFinsh=false
  async onLoad(){
    await super.onLoad();
    let button  = this.node.getComponent(cc.Button);
    if(!button){
      button=this.node.addComponent(cc.Button)
    }
    this.node.on('click',this.onClick,this);
  }

  onClick(){
    this.onClose()
  }

  setGray(isGray: boolean = false) {
    this.iconSp.setMaterial(
      0,
      !!isGray ? this.grayMaterial : this.spriteMaterial
    );
  }

  onClickCard() {
    if(!!this.isSwitchFinsh){
        this.setCardId(this.id)
        this.isSwitchFinsh=false
        return;
    }
    this.isSwitchFinsh=true
    let bundle = g_global.getByKey("iconcardbg2");
    if(this.id<=54){
      bundle = g_global.getByKey("iconcardbg1");
    }
    if (!!bundle) {
      bundle.load( this.id+"", cc.SpriteFrame, (error, sp: cc.SpriteFrame) => {
        if (!!error) {
          console.log(error);
        } else {
          this.iconSp.spriteFrame = sp;
        }
      });
    }
  }
  setCardId(id){
    this.id = id
    let isHave = !(g_global.dataManager as WaterMaiginDataManager).getIsHaveCard( this.id)
    this.setGray(isHave)
    let bundle = g_global.getByKey("iconcardbg2");
    if(this.id<=54){
      bundle = g_global.getByKey("iconcardbg1");
    }
    bundle = g_global.getByKey("iconcard");

    if (!!bundle) {
      bundle.load( id+"", cc.SpriteFrame, (error, sp: cc.SpriteFrame) => {
        if (!!error) {
          console.log(error);
        } else {
          this.iconSp.spriteFrame = sp;
        }
      });
    }
  }

  setData(data){
    super.setData(data)
    this.setCardId(data)
  }
}
