import { EnumOpenSceneMethod } from "../Framework/Manager/EnumOpenSceneMethod";
import WaterMaiginCardTool from "../Games/WaterMargin/Data/WaterMaiginCardTool";
import WaterMaiginDataManager from "../Games/WaterMargin/Data/WaterMaiginDataManager";
import WaterMarginPlayer from "../Games/WaterMargin/Data/WaterMarginPlayer";
import GlobalManager from "./../Framework/Manager/GlobalManager";
export class GameGlobal extends GlobalManager {
  cardTool : WaterMaiginCardTool = null;
  constructor() {
    super({
      "dataManager": WaterMaiginDataManager,
    });
    this.interFaceManager.setNetWaitUIPrefabName("FrameworkRotateIcon");
    this.openSceneMethod = EnumOpenSceneMethod.FIRSTNET;
    (this.dataManager as WaterMaiginDataManager).create("player", WaterMarginPlayer);
    this.cardTool = new WaterMaiginCardTool();
  }
  init(){
    super.init();
    g_global.platform.initShowShareMenu();
  }
}
var g_global = new GameGlobal();
export default g_global;
