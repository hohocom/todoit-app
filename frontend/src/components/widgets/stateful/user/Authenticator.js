import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from 'states/user'
import { apiScaffold, refreshToken } from 'utils/apis'
import { useLocation } from 'react-router'

function Authenticator(props){
    const [user, setUser] = useRecoilState(userState)
    const location = useLocation()
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      // console.debug(user)
      // 새로고침되었을 때 토큰 재발급
      const { userId } = await refreshToken()
      // 유저 정보 가져오기
      await getUserInfoThenSetUserState(userId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const workspaceCode = location.pathname.split('workspaces/')[1]
      // console.debug(workspaceCode)
      user.workspaces.map((workspace) => {
        console.log(workspace.code)
        if (workspaceCode === workspace.code) {
          setWorkspaceDetail({
            ...workspaceDetail,
            id: workspace.id,
            name: workspace.name,
            code: workspace.code,
          })
        }
      })
    }, [])
  
    const getUserInfoThenSetUserState = async (userId) => {
      const res = await apiScaffold({
        method: 'get',
        url: `/users/${userId}`,
      })
  
      console.debug(res)
  
      setUser({
        ...user,
        id: res.user.id,
        email: res.user.email,
        nickname: res.user.nickname,
        workspaces: res.user.workspaces,
      })
    }

    return(
        props.children
    )
}

export default Authenticator