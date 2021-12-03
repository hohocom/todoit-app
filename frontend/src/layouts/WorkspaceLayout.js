import bgImg from '../assets/images/bg.jpg'

function WorkspaceLayout({ children }) {
  return (
    <div className="fixed top-0 left-0 flex w-full h-full font-apple-light">
      <aside className="min-w-[300px] h-full border-r border-gray-300">
        <figure className="w-full p-10">LOGO</figure>
      </aside>
      <main className="flex-col w-full h-full">
        <header className="w-full h-[60px] border-b"></header>
        <section className="w-full h-full overflow-y-scroll pb-[100px] custom-scroll">
          {children}
        </section>
      </main>
      <aside className="min-w-[400px] h-full border-l">
        <div className="w-full h-full bg-[#F2F2F2]  flex flex-col justify-start items-center p-[30px]">
          <div className="flex items-center justify-between w-full px-2 py-10">
            <i className="far fa-bell text-[#FF9E5D] text-3xl"></i>
          </div>
          <div className="flex flex-col items-center justify-center w-full bg-white rounded-3xl">
            <div className="w-[120px] h-[120px] rounded-full -mt-7 flex items-center justify-center border-4 border-rainbow-1">
              <img
                src={bgImg}
                alt="img"
                className="w-[100px] h-[100px] rounded-full"
              />
            </div>
            <div className="mt-4 text-xl text-black font-apple-bold">
              고재범
            </div>
            <div className="text-base text-gray-600 font-apple-bold">
              Developer
            </div>

            <div className="flex flex-col items-center justify-start w-full pl-5">
              <div className="mt-2 -mb-1 text-base text-black font-apple-bold w-[80%]">
                2 LVL
              </div>
              <div className="flex items-center justify-center w-[80%]">
                <div
                  id="lv-progress"
                  className="h-[20px] border border-[#FF9E5D] rounded-3xl w-full overflow-hidden"
                >
                  <div className="w-[40%] h-full bg-[#FF9E5D] transition-all delay-200"></div>
                </div>
                <div className="mt-1 ml-2 text-base text-black font-apple-bold">
                  40%
                </div>
              </div>
            </div>

            <div className="flex my-6">
              <div className="flex flex-col items-center border-r border-[#FF9E5D] px-5 pb-3">
                <div className="font-apple-bold text-xl text-[#FF9E5D] pb-3">
                  작성한 일정
                </div>
                <div className="text-3xl font-apple-hard">30</div>
              </div>
              <div className="flex flex-col items-center px-5">
                <div className="font-apple-bold text-xl text-[#FF9E5D] pb-3">
                  작성한 일정
                </div>
                <div className="text-3xl font-apple-hard">27</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default WorkspaceLayout
