import { useWorkInit, useWorkspace } from "core/hook";
import { useEffect, useRef } from "react";
import SockJsClient from "react-stomp";

function WorkspaceContainer({ children }) {
  useWorkInit();
  const { workspaceDetail } = useWorkspace();
  const websocket = useRef(null);

  useEffect(() => {
    console.debug("----------------------------------");
    console.debug(websocket);
  }, []);

  return (
    <div className="fixed top-0 left-0 flex w-full h-full bg-gray-100 font-apple-light">
      <SockJsClient
        url={`${process.env.REACT_APP_API_URL}/start`}
        topics={["/topics/sendTo", "/topics/template", "/topics/api"]}
        onMessage={(msg) => {
          console.log(msg);
        }}
        ref={websocket}
      />
      {children}
    </div>
  );
}

export default WorkspaceContainer;
