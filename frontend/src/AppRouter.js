import React from "react";
import { useRoutes } from "react-router-dom";
import {
  KaKaoRedirectPage,
  LoginPage,
  NaverRedirectPage,
  WelcomePage,
  WorkspaceCollectionPage,
  SchedulePage,
  Forbidden403Page,
  MemberPage,
} from "pages";

function AppRouter() {
  const route = useRoutes([
    // Public Page
    { path: "/", element: <WelcomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/login/oauth/kakao", element: <KaKaoRedirectPage /> },
    { path: "/login/oauth/naver", element: <NaverRedirectPage /> },
    // // Scure Page
    { path: "/workspaces", element: <WorkspaceCollectionPage /> },
    { path: "/workspaces/:id", element: <SchedulePage /> },
    { path: "/workspaces/:id/members", element: <MemberPage /> },
    // // Error
    { path: "/403", element: <Forbidden403Page /> },
  ]);

  return route;
}

export default AppRouter;
