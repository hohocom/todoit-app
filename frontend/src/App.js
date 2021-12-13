import React from "react";
import LoginPage from "./components/pages/LoginPage";
import WelcomePage from "./components/pages/WelcomePage";
import DashboardPage from "./components/pages/secure/DashboardPage";
import WorkspacesPage from "./components/pages/secure/WorkspacesPage";
import MembersPage from "./components/pages/secure/MembersPage";
import LoginKakaoRedirectPage from "./components/pages/LoginKakaoRedirectPage";
import LoginNaverRedirectPage from "./components/pages/LoginNaverRedirectPage";
import Forbidden403Page from "./components/pages/Forbidden403Page";
import { useRoutes } from "react-router";

function App() {
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

  return route;
}

export default App;
