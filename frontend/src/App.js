import React from 'react'
import { useRoutes } from 'react-router'
import LoginPage from './components/pages/LoginPage'
import WelcomePage from './components/pages/WelcomePage'
import DashboardPage from './components/pages/workspace/DashboardPage'
import MemberPage from './components/pages/workspace/MemberPage'
import AttendancePage from './components/pages/workspace/AttendancePage'
import WorkspacesPage from './components/pages/workspace/WorkspacesPage'
import PhotoListPage from './components/pages/workspace/PhotoListPage'
import LoginKakaoRedirectPage from './components/pages/LoginKakaoRedirectPage'
import LoginNaverRedirectPage from './components/pages/LoginNaverRedirectPage'

function App() {
  const route = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/login/oauth/kakao', element: <LoginKakaoRedirectPage /> },
    { path: '/login/oauth/naver', element: <LoginNaverRedirectPage /> },
    { path: '/workspaces', element: <WorkspacesPage /> },
    { path: '/workspaces/:id', element: <DashboardPage /> },
    { path: '/workspaces/:id/members', element: <MemberPage /> },
    { path: '/workspaces/:id/attendances', element: <AttendancePage /> },
    { path: '/workspaces/:id/photos', element: <PhotoListPage /> },
  ])

  return route
}

export default App
