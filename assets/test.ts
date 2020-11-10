const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  @property({ tooltip: "icon", type: cc.Node })
  node1: cc.Node = null;

  @property({ tooltip: "icon", type: cc.Node })
  node2: cc.Node = null;

  onClick() {

    for( let i = 0 ; i < 10 ; ++i){

      setTimeout(()=>{
        let worldPos = this.node1.convertToWorldSpaceAR(cc.Vec2.ZERO);
        console.log(`节点1的世界坐标x=${worldPos.x},y=${worldPos.y}` );
        let newPost = this.node2.convertToNodeSpaceAR(worldPos);
        console.log(`用节点1的世界坐标计算节点2在节点1的位置x=${newPost.x},y=${newPost.y}` );
        this.node2.setPosition(newPost)
      },1000*i)

    }
  }
}
