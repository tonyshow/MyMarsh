import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import CompFit from "../../Framework/Components/CompFit";
import CompGrid from "../../Framework/Components/CompGrid";
import ResUtil from "../../Framework/Manager/ResManager/ResUtil";
import g_global from "../../Script/GameGlobal";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginCardPage extends cc.Component {
  @property({ tooltip: "预制体", type: cc.Enum(EnumPrefab) })
  enumPrefabCard = EnumPrefab.NONE;

  @property({ tooltip: "格子组件", type: CompGrid })
  compGrid: CompGrid = null;
  data:any=null;

  setData(data){
    this.data=data

  }
  onLoad(){
    this.addCards();
  }

  async addCards() {
    let nodeCardSize=null;
    let itemSize = null;
    for (let i = 0; i < this.data.length; ++i) {
      let nodeCardComp = await ResUtil.getCompByEnumPrefab(this.enumPrefabCard,this.node);
      nodeCardComp.setCardId(this.data[i]);
      let nodeCard  = nodeCardComp.node
      if(i == 0 ){
        nodeCardSize = nodeCard.getContentSize();
        let scale = g_global.fit.getFitAutoInScale()
        nodeCardSize = new cc.Size(nodeCardSize.width*scale,nodeCardSize.height*scale);
        itemSize =  this.compGrid.setScale(scale).setItemSize(nodeCardSize)
      }
      nodeCard.setContentSize(itemSize);
      nodeCard.setPosition(this.compGrid.getPosition());
    }
  }
}
