import MsgBox from "../../Framework/Interface/Msg/MsgBox";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MsgWaterMarginPlayer extends MsgBox {
  @property({ tooltip: "信息", type: cc.Node })
  infoNode: cc.Node = null;

  @property({ tooltip: "背景", type: cc.Node })
  bgNode: cc.Node = null;
  start(){
    if(  !!this.data.userInfo ){
      if(!!this.data.userInfo.nickName){
        let title =  this.infoNode.getChildByName("title")
        let info =  title.getChildByName("info")
        title.getComponent(cc.Label).string = "名字:"
        info.getComponent(cc.Label).string = this.data.userInfo.nickName
      }
      if(!!this.data.userInfo.gender){
        let nodes = cc.instantiate(this.infoNode);
        this.bgNode.addChild(nodes);
        let title =  nodes.getChildByName("title")
        let info =  title.getChildByName("info")
        title.getComponent(cc.Label).string = "性别:"
        let gender = "未知"
        if(1==this.data.userInfo.gender){
          gender = "男"
        }else if(2 ==this.data.userInfo.gender){
          gender = "女"
        }
        info.getComponent(cc.Label).string =gender
      }
    }
  }
  async onLoad() {
    await super.onLoad();



  }
}
