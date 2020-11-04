import MsgManager from "../Framework/Interface/Msg/MsgManager";
import { EnumOpenSceneMethod } from "../Framework/Manager/EnumOpenSceneMethod";
import NetManager from "../Framework/Manager/NetManager/NetManager";
import GlobalManager from "./../Framework/Manager/GlobalManager";
export class GameGlobal extends GlobalManager {
  netManager: NetManager = null;
  msgManager: MsgManager = null;
  constructor() {
    super();
    this.netManager = new NetManager();
    this.msgManager = new MsgManager();
    this.interFaceManager.setNetWaitUIPrefabName("FrameworkRotateIcon");
    this.openSceneMethod = EnumOpenSceneMethod.FIRSTNET
  }
}
var g_global = new GameGlobal();
export default g_global;
