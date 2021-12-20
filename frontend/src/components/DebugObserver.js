import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("%c[ATOM 상태 변화 감지]", "color:purple");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

export default DebugObserver;
