import WelcomeLayout from '../layouts/WelcomeLayout'

function WorkspaceListPage() {
  return (
    <WelcomeLayout>
      <div className="flex flex-col items-center justify-center w-full h-screen border-2">
        <button className="p-5 border rounded-md">워크스페이스 생성</button>
        <br/>
        <button className="p-5 border rounded-md">호호컴퍼니</button>
        <button className="p-5 border rounded-md">개인일정</button>
        <button className="p-5 border rounded-md">학교일정</button>
      </div>
    </WelcomeLayout>
  )
}

export default WorkspaceListPage
