import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { apiScaffold } from '../../customs/apis'
import { userState } from '../../globalState/user'

function WorkspaceCreator() {
  const [name, setName] = useState('')
  const user = useRecoilValue(userState)

  const changeName = (e) => {
    setName(e.target.value)
  }

  const submitWorkspace = async () => {
    const formData = new FormData()
    formData.append('userId', user.id)
    formData.append('name', name)

    const res = await apiScaffold({
      method: 'post',
      url: '/workspaces',
      data: formData,
    })
    console.debug(res)

    setName('')
  }

  return (
    <div className="flex items-center justify-between">
      <input
        className="w-full p-3 border rounded-[4px] outline-none"
        placeholder="워크스페이스 이름"
        value={name}
        onChange={changeName}
      />
      <button
        className="min-w-[30%] p-3 bg-[#ffac5ef3] text-white rounded-[4px] ml-1"
        onClick={submitWorkspace}
      >
        생성
      </button>
    </div>
  )
}

export default WorkspaceCreator
