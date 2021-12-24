/* eslint-disable react-hooks/exhaustive-deps */
import { useWorkInit } from "core/hook";
// import { useRef } from "react";
// import SockJsClient from "react-stomp";

function WorkspaceContainer({ children }) {
  useWorkInit();
  // const websocket = useRef(null);
  // websocket.current.sendMessage("/works", workspaceDetail.id);

  return (
    <div className="fixed top-0 left-0 flex w-full h-full bg-gray-100 font-apple-light">
      {/* <SockJsClient
        url={`${process.env.REACT_APP_API_URL}/start`}
        topics={["/topics/works"]}
        onMessage={(msg) => {
          console.debug("메시지 안날라와~~~~~~~~~~~~~~~~~~~~~~~~~");
          console.debug(msg);
        }}
        ref={websocket}
      /> */}
      {children}
    </div>
  );
}

export default WorkspaceContainer;
