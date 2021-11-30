import React from 'react'
import { useRoutes } from 'react-router'
import JoinPage from './pages/JoinPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import WelcomePage from './pages/WelcomePage'
import WorkspaceCreatePage from './pages/WorkspaceCreatePage'

function App() {
  const route = useRoutes([
    { path: '', element: <WelcomePage /> },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'join',
      element: <JoinPage />,
    },
    {
      path: 'workspaces',
      element: <WorkspaceCreatePage />,
      children: [
        { path: ':id', element: <MainPage /> },
        { path: 'temp', element: <WorkspaceCreatePage /> },
      ],
    },
  ])

  return route
}

export default App
