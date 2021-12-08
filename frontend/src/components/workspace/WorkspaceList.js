import { useRecoilState } from 'recoil'
import { userState } from '../../globalState/user'

function WorkspaceList() {
  const [user, setUser] = useRecoilState(userState)
  return user.workspaces.length > 0 ? (
    user.workspaces.map((workspace, index) => {
      return (
        <div
          className="border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2"
          key={index}
        >
          <div
            id="title"
            className="p-3 mt-1 cursor-pointer hover:text-yellow-500 font-apple-bold"
          >
            호호컴퍼니
          </div>
          <div className="p-3">
            <i className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"></i>
            <i className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"></i>
          </div>
        </div>
      )
    })
  ) : (
    <div className="w-full p-3 pt-4 bg-white border rounded-md">
      가입된 워크스페이스가 없습니다 😅
    </div>
  )
}

export default WorkspaceList
