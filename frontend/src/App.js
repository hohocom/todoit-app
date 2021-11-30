import React from 'react'
import {useRoutes} from 'react-router'
import JoinPage from './pages/JoinPage'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/workspace/DashboardPage'
import MemberPage from './pages/workspace/MemberPage'
import AttendancePage from './pages/workspace/AttendancePage'
import WorkspaceListPage from './pages/workspace/WorkspaceListPage'
import PhotoListPage from './pages/workspace/PhotoListPage'

function App() {

    const route = useRoutes([
        {path: '/', element: <WelcomePage/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/join', element: <JoinPage/>},
        {path: '/workspaces', element: <WorkspaceListPage/>},
        {path: '/workspaces/:id', element: <DashboardPage/>},
        {path: '/workspaces/:id/members', element: <MemberPage/>},
        {path: '/workspaces/:id/attendances', element: <AttendancePage/>},
        {path: '/workspaces/:id/photos', element: <PhotoListPage/>},
    ])

    return route
}

export default App
