import React from 'react'
import { useRoutes } from 'react-router'
import JoinPage from './pages/JoinPage'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/workspace/DashboardPage'
import MemberPage from './pages/workspace/MemberPage'
import AttendancePage from './pages/workspace/AttendancePage'
import WorkspacesPage from './pages/workspace/WorkspacesPage'
import PhotoListPage from './pages/workspace/PhotoListPage'
import LoginKakaoRedirectPage from './pages/LoginKakaoRedirectPage'
import LoginNaverRedirectPage from './pages/LoginNaverRedirectPage'

function App() {
  const route = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/login/oauth/kakao', element: <LoginKakaoRedirectPage /> },
    { path: '/login/oauth/naver', element: <LoginNaverRedirectPage /> },
    { path: '/join', element: <JoinPage /> },
    { path: '/workspaces', element: <WorkspacesPage /> },
    { path: '/workspaces/:id', element: <DashboardPage /> },
    { path: '/workspaces/:id/members', element: <MemberPage /> },
    { path: '/workspaces/:id/attendances', element: <AttendancePage /> },
    { path: '/workspaces/:id/photos', element: <PhotoListPage /> },
  ])

  return route
}

export default App
