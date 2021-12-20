import {
  WorkspaceContainer,
  WorkspaceLeftSide,
  WorkspaceRightSide,
  WorkspaceMain,
  WorkspaceHeader,
  WorkspaceSection,
} from "components/layout/workspace";
import { useSecure, useSetWorkspaceDetail } from "core/hook";

function MemberPage() {
  useSecure();
  useSetWorkspaceDetail();
  return (
    <WorkspaceContainer>
      <WorkspaceLeftSide />
      <WorkspaceMain>
        <WorkspaceHeader />
        <WorkspaceSection></WorkspaceSection>
      </WorkspaceMain>
      <WorkspaceRightSide />
    </WorkspaceContainer>
  );
}

export default MemberPage;
