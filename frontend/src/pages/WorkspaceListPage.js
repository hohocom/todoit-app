import bgImg from '../assets/images/bg.jpg'

function WorkspaceListPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#FFC35E] to-[#ffac5ef3] font-apple-regular text-[#424242]">
      <div className="w-[370px] h-[600px] rounded-2xl bg-white shadow-custom">
        <div className="flex flex-col items-center justify-center w-full h-[200px]">
          <img
            src={bgImg}
            alt="img"
            className="w-[100px] h-[100px] rounded-full shadow-lg"
          />
          <div className="mt-2 text-xl font-apple-regular">고재범</div>
        </div>
        <div className="w-full p-4 border rounded-xl">
          <div className="flex w-full p-4 bg-gray-100 border font-apple-bold rounded-[4px] mt-2">
            워크스페이스 생성
          </div>
          <div className="flex w-full p-4 bg-gray-100 border font-apple-bold rounded-[4px] mt-2">
            호호컴퍼니
          </div>
          <div className="flex w-full p-4 bg-gray-100 border font-apple-bold rounded-[4px] mt-2">
            학과일정
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceListPage
