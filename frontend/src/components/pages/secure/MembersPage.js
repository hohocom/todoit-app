import { useRef, useState } from "react";

import WorkspaceContainer from "components/layout/WorkspaceContainer";
import WorkspaceLeftSide from "components/layout/WorkspaceLeftSide";
import WorkspaceMain from "components/layout/WorkspaceMain";
import WorkspaceHeader from "components/layout/WorkspaceHeader";
import WorkspaceSection from "components/layout/WorkspaceSection";
import WorkspaceRightSide from "components/layout/WorkspaceRightSide";
import WorkCreateModal from "components/domain/work/WorkCreateModal";
import WorksShowModal from "components/domain/work/WorksShowModal";

import SockJsClient from "react-stomp";
import withSecure from "components/domain/user/withSecure";

function MembersPage() {
  const websocket = useRef();
  const [texts, setTexts] = useState([]);

  const handleClickSendTo = () => {
    const data = {
      text: "hellow",
    };
    websocket.current.sendMessage(
      "/sendTo",
      JSON.stringify({
        text: "hellow",
      })
    );
  };

  return (
    <WorkspaceContainer>
      <WorkspaceLeftSide />
      <WorkspaceMain>
        <WorkspaceHeader />
        <WorkspaceSection>
          <SockJsClient
            url={`${process.env.REACT_APP_API_URL}/start`}
            topics={["/topics/sendTo", "/topics/template", "/topics/api"]}
            onMessage={(msg) => {
              console.log(msg);
              setTexts(texts.concat(msg.text));
            }}
            ref={websocket}
          />
          <button onClick={handleClickSendTo}>SendTo</button>
          <div>
            {texts.map((text, index) => {
              console.log(text);
              return <p key={index}>{text}</p>;
            })}
          </div>
        </WorkspaceSection>
      </WorkspaceMain>
      <WorkspaceRightSide />

      <WorkCreateModal />
      <WorksShowModal />
    </WorkspaceContainer>
  );
}

export default withSecure(MembersPage);
