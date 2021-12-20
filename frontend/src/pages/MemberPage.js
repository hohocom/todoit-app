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
        <WorkspaceSection>회원 관리 페이지</WorkspaceSection>
      </WorkspaceMain>
      <WorkspaceRightSide />
    </WorkspaceContainer>
  );
}

export default MemberPage;
