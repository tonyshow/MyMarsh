import { EnumOpenSceneMethod } from "../Framework/Manager/EnumOpenSceneMethod";
import WaterMaiginDataManager from "../Games/WaterMargin/Data/WaterMaiginDataManager";
import WaterMarginPlayer from "../Games/WaterMargin/WaterMarginPlayer";
import GlobalManager from "./../Framework/Manager/GlobalManager";
export class GameGlobal extends GlobalManager {
  constructor() {
    super({
      "dataManager": WaterMaiginDataManager,
    });
    this.interFaceManager.setNetWaitUIPrefabName("FrameworkRotateIcon");
    this.openSceneMethod = EnumOpenSceneMethod.FIRSTNET;
    (this.dataManager as WaterMaiginDataManager).create("player", WaterMarginPlayer);
  }
  init(){
    super.init();
    g_global.platform.initShowShareMenu();
  }
}
var g_global = new GameGlobal();
export default g_global;
