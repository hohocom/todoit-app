import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import WorkspaceCreator from '../../widgets/stateful/workspace/WorkspaceCreator'
import WorkspaceList from '../../widgets/stateful/workspace/WorkspaceList'
import { apiScaffold, refreshToken } from '../../../utils/apis'
import { particlesPlay } from '../../../utils/particles'
import { userState } from '../../../states/user'
import '../../../lib/particles.min.js'

function WorkspacesPage() {
  const [user, setUser] = useRecoilState(userState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // 파티클 효과
    particlesPlay()
    // 새로고침되었을 때 토큰 재발급
    const { userId } = await refreshToken()
    // 유저 정보 가져오기
    await getUserInfoThenSetUserState(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      workspaces: res.user.workspaces
    })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-[#FFC35E] to-[#ffac5ef3] font-apple-regular text-[#424242]">
      <div className="relative z-10 flex flex-col items-center justify-center text-2xl text-white py-14 sm:text-4xl sm:py-5 font-apple-hard">
        <div className="font-shadow2">{user.nickname}님</div>
        <div className="font-shadow2">환영합니다!</div>
      </div>
      <div className="w-full sm:w-[400px] h-full sm:h-auto bg-white rounded-t-3xl rounded-b-none sm:rounded-xl flex flex-col justify-start items-center p-4 pt-5 z-10">
        <div className="w-full mb-4">
          <h2>가입된 워크스페이스 ( {user.workspaces.length} )</h2>
          <WorkspaceList />
        </div>

        <div className="w-full">
          <h2>초대코드로 가입</h2>
          <input
            className="w-full p-3 border border-[#FFC35E] rounded-[4px] outline-none bg-gray-50"
            placeholder="초대코드를 입력해주세요."
          />
        </div>

        <div className="w-full mt-4">
          <h2>워크스페이스 생성</h2>
          <WorkspaceCreator />
        </div>

        <div className="w-full mt-6 text-right">
          <button className="hover:text-[#ffac5ef3] text-sm">로그아웃</button>
        </div>
      </div>
      <div
        id="particles-js"
        className="absolute top-0 left-0 w-full h-screen"
      ></div>
    </div>
  )
}

export default WorkspacesPage
