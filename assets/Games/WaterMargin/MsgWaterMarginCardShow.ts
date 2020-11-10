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
  isGray=false
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
    this.isGray=isGray;
    if(!!isGray){
      this.grayMaterial.setProperty(`x_count`, 100);
      this.grayMaterial.setProperty(`y_count`, 100);
    }
    this.iconSp.setMaterial(
      0,
      !!isGray ? this.grayMaterial : this.spriteMaterial
    );
    //this.iconSp.node.opacity = !!isGray ? 30 : 255;
  }

  onClickCard() {
    if(!!this.isSwitchFinsh){
        this.setCardId(this.id)
        this.isSwitchFinsh=false
        return;
    }

    if(!!this.isGray){
      this.grayMaterial.setProperty(`x_count`, 200);
      this.grayMaterial.setProperty(`y_count`, 200);
    }

    this.iconSp.spriteFrame = g_global.getByKey('cardbg'+this.id);
    this.isSwitchFinsh=true
    //let bundle = g_global.getByKey("iconcardbg2");
    //if(this.id<=54){
    //  bundle = g_global.getByKey("iconcardbg1");
    //}
    //if (!!bundle) {
    //  bundle.load( this.id+"", cc.SpriteFrame, (error, sp: cc.SpriteFrame) => {
    //    if (!!error) {
    //      console.log(error);
    //    } else {
    //      this.iconSp.spriteFrame = sp;
    //    }
    //  });
    //}
  }
  setCardId(id){
    this.id = id
    let isHave = !(g_global.dataManager as WaterMaiginDataManager).getIsHaveCard( this.id)
    this.setGray(isHave)
    this.iconSp.spriteFrame = g_global.getByKey('card'+this.id);
    this.isSwitchFinsh=true
    //let bundle = g_global.getByKey("iconcardbg2");
    //if(this.id<=54){
    //  bundle = g_global.getByKey("iconcardbg1");
    //}
    //bundle = g_global.getByKey("iconcard");

    //if (!!bundle) {
    //  bundle.load( id+"", cc.SpriteFrame, (error, sp: cc.SpriteFrame) => {
    //    if (!!error) {
    //      console.log(error);
    //    } else {
    //      this.iconSp.spriteFrame = sp;
    //    }
    //  });
    //}
  }

  setData(data){
    super.setData(data)
    this.setCardId(data)
  }
}
