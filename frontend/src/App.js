import React from "react";
import LoginPage from "./components/pages/LoginPage";
import WelcomePage from "./components/pages/WelcomePage";
import DashboardPage from "./components/pages/secure/DashboardPage";
import WorkspacesPage from "./components/pages/secure/WorkspacesPage";
import MembersPage from "./components/pages/secure/MembersPage";
import LoginKakaoRedirectPage from "./components/pages/LoginKakaoRedirectPage";
import LoginNaverRedirectPage from "./components/pages/LoginNaverRedirectPage";
import Forbidden403Page from "./components/pages/Forbidden403Page";
import EmojiToast from "components/shared/EmojiToast"
import { useRoutes } from "react-router";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { emojiToastState } from "states/toast";

function App() {

  const emojiToast = useRecoilValue(emojiToastState);
  const emojiToastReset = useResetRecoilState(emojiToastState);

  const route = useRoutes([
    // Public Page
    { path: "/", element: <WelcomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/login/oauth/kakao", element: <LoginKakaoRedirectPage /> },
    { path: "/login/oauth/naver", element: <LoginNaverRedirectPage /> },
    // Scure Page
    { path: "/workspaces", element: <WorkspacesPage /> },
    { path: "/workspaces/:id", element: <DashboardPage /> },
    { path: "/workspaces/:id/members", element: <MembersPage /> },
    // Error
    { path: "/403", element: <Forbidden403Page /> },
  ]);

  return (
    <>
      {route}
      <EmojiToast 
        toast={emojiToast}
        resetToast={emojiToastReset}
      />
    </>
  );
}

export default App;
