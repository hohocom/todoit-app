import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { apiScaffold } from '../../customs/apis'
import { userState } from '../../globalState/user'

function WorkspaceUpdater({ workspaceName, workspaceId, setSelectNumber }) {
  const [name, setName] = useState(workspaceName)
  const [user, setUser] = useRecoilState(userState)

  const updateWorkspaceName = async () => {
    const formData = new FormData()
    formData.append('userId', user.id)
    formData.append('workspaceName', name)

    await apiScaffold({
      method: 'put',
      url: `/workspaces/${workspaceId}`,
      data: formData,
    })

    const newWorkspaces = user.workspaces.map((workspace) => {
      if (workspace.id === workspaceId) return { ...workspace, name: name }
      else return workspace
    })

    setUser({
      ...user,
      workspaces: newWorkspaces,
    })
    setSelectNumber(0)
  }

  return (
    <div className="absolute top-0 left-0 flex justify-between w-full h-full bg-white">
      <input
        className="w-full h-full p-4 rounded-l-[4px] border-r outline-none bg-gray-50"
        placeholder="이름 수정"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="min-w-[100px] flex flex-col items-center justify-center">
        <button
          className="rounded-tr-[4px] w-full h-1/2 border-b bg-yellow-300 pt-1"
          onClick={updateWorkspaceName}
        >
          수정
        </button>
        <button
          className="rounded-br-[4px] w-full h-1/2"
          onClick={() => setSelectNumber(0)}
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default WorkspaceUpdater
