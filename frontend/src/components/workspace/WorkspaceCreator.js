import { useState } from 'react'

function WorkspaceCreator() {
  const [name, setName] = useState('')
  return (
    <div className="flex items-center justify-between">
      <input
        className="w-full p-3 border rounded-[4px] outline-none"
        placeholder="워크스페이스 이름"
      />
      <button className="min-w-[30%] p-3 bg-[#ffac5ef3] text-white rounded-[4px] ml-1">
        생성
      </button>
    </div>
  )
}

export default WorkspaceCreator
