const {ccclass, property} = cc._decorator;
@ccclass
export default class WaterMarginSimplyFace extends cc.Component {
  row=4
  column=2
     start () {
      //let space=5;

      //let size = (this.node.getParent() as cc.Node).getContentSize()
      //let itemWidth = (size.width - space * (this.row+ 1)) /this.row;
      //itemWidth = Math.floor(itemWidth);
      //this.node.width=itemWidth

     }
    // start () {}
     update (dt) {
      // cc.log( this.node.getContentSize() )
     }
}
