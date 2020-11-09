const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginSimplyFace extends cc.Component {

  @property({ tooltip: "干脆面icon",type:cc.Node })
  iconNode:cc.Node=null;
  start() {

  }
  // start () {}
  update(dt) {
    // cc.log( this.node.getContentSize() )
  }

  setHave(_isHave?:boolean){
    this.iconNode.active=_isHave;
  }
}
