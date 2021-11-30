import React from 'react'
import { useRoutes } from 'react-router'
import JoinPage from './pages/JoinPage'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'

function App() {
  const route = useRoutes([
    { path: '/', element: <WelcomePage /> },
    {
      path: '/login',
      element: <LoginPage />,
      // children: [{ path: ':id', element: <Main /> }],
    },
    {
      path: '/join',
      element: <JoinPage />,
    },
  ])

  return route
}

export default App
