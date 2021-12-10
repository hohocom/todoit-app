import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { apiScaffold } from '../../../../utils/apis'
import { userState } from '../../../../states/user'
import WorkspaceUpdater from './WorkspaceUpdater'

function WorkspaceList() {
  const [user, setUser] = useRecoilState(userState)
  const [selectNumber, setSelectNumber] = useState(null)
  const deleteWorkspace = async (workspaceId) => {
    const result = window.prompt(
      "워크스페이스를 삭제하려면 'DELETE'를 입력해주세요",
    )
    const rightAnswer = 'DELETE'
    if (result !== rightAnswer) return false

    await apiScaffold({
      method: 'delete',
      url: `/workspaces/${workspaceId}?userId=${user.id}`,
    })

    const newWorkspaces = user.workspaces.filter(
      (workspace) => workspace.id !== workspaceId,
    )
    setUser({
      ...user,
      workspaces: newWorkspaces,
    })
  }

  return user.workspaces.length > 0 ? (
    user.workspaces.map((workspace, index) => {
      return (
        <div
          className="relative border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2"
          key={workspace.id}
        >
          <Link
            to={`/workspaces/${workspace.code}`}
            id="title"
            className="flex flex-col p-3 mt-1 cursor-pointer hover:text-yellow-500 font-apple-bold"
          >
            <div>{workspace.name}</div>
            <div className="text-xs text-gray-600 font-apple-regular">
              {workspace.code}
            </div>
          </Link>
          <div className="p-3">
            <i
              className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"
              onClick={() => setSelectNumber(workspace.id)}
            ></i>
            <i
              className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"
              onClick={() => deleteWorkspace(workspace.id)}
            ></i>
          </div>
          {selectNumber === workspace.id && (
            <WorkspaceUpdater
              workspaceName={workspace.name}
              workspaceId={workspace.id}
              setSelectNumber={setSelectNumber}
            />
          )}
        </div>
      )
    })
  ) : (
    <div className="w-full p-3 pt-4 border rounded-md bg-gray-50">
      가입된 워크스페이스가 없습니다 😅
    </div>
  )
}

export default WorkspaceList
