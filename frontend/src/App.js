import React from 'react'
import { useRoutes } from 'react-router'
import LoginPage from './components/templates/LoginPage'
import WelcomePage from './components/templates/WelcomePage'
import DashboardPage from './components/templates/workspace/DashboardPage'
import MemberPage from './components/templates/workspace/MemberPage'
import AttendancePage from './components/templates/workspace/AttendancePage'
import WorkspacesPage from './components/templates/workspace/WorkspacesPage'
import PhotoListPage from './components/templates/workspace/PhotoListPage'
import LoginKakaoRedirectPage from './components/templates/LoginKakaoRedirectPage'
import LoginNaverRedirectPage from './components/templates/LoginNaverRedirectPage'

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
