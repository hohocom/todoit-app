import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "states/user";
import { workspaceDetailState } from "states/workspace";
import { cheerUpMessageState } from "states/message";
import Avatar from "components/shared/Avatar";

function WorkspaceRightSide() {
  const user = useRecoilValue(userState);
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const [cheerUpMessage, setCheerUpMessage] =
    useRecoilState(cheerUpMessageState);

  const [exp, setExp] = useState(10);

  useEffect(() => {
    const timer = setMessageByMatchTimes();

    return () => {
      console.debug("타이머 종료");
      clearInterval(timer);
    };
  }, []);

  const setMessageByMatchTimes = () => {
    const RESET_TIME = 1000 * 60;
    matchMessage();
    return setInterval(() => {
      matchMessage();
    }, RESET_TIME);
  };

  const matchMessage = () => {
    // Notification.requestPermission().then(function (result) {
    //   console.log(result);
    // });
    // setTimeout(notification.close.bind(notification), 10000);

    // var notification = new Notification("투두잇", {
    //   body: "곧 점심시간이에요! 조금만 더 화이팅!! 👊",
    //   icon: bgImg,
    // });
    const hours = new Date().getHours();
    if (hours >= 6 && 11 > hours) {
      setCheerUpMessage("즐거운 아침이에요 :) 🐥");
    } else if (hours >= 11 && 12 > hours) {
      setCheerUpMessage("곧 점심시간이에요! 조금만 더 화이팅!! 👊");
    } else if (hours >= 12 && 13 > hours) {
      setCheerUpMessage("키보드에서 당장 손 때세요! 맛점하세요!! 🍔");
    }
  };

  return (
    <aside className="min-w-[350px] h-full border-l">
      <div className="w-full h-full bg-[#F2F2F2]  flex flex-col justify-start  p-5">
        <div className="flex items-center justify-between w-full px-2 pt-2 pb-5">
          <div>
            {/* <i className="text-3xl text-red-300 cursor-pointer far fa-bell"></i> */}
          </div>
          <i className="far fa-edit text-[#FF9E5D] text-2xl cursor-pointer"></i>
        </div>
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-xl box-shadow1">
          <div
            className="w-[120px] h-[120px] rounded-full -mt-7 flex items-center justify-center border-4 
          border-l-[#F5A9BC] border-t-[#F781BE] border-b-[#FF9E5D] border-r-[#FF9E5D]"
          >
            <Avatar
              thumbnailImage={user.thumbnailImage}
              size={100}
              hover={false}
            />
          </div>
          <div className="mt-4 text-xl text-black font-apple-hard">
            {user.nickname}
          </div>
          <div className="text-base text-gray-600 font-apple-bold">
            Developer
          </div>

          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex items-center justify-between w-8/12 mt-2 -mb-1 text-gray-600 font-apple-hard">
              <div>
                <span className="text-2xl">24</span>
                <span className="text-base">&nbsp;LVL</span>
              </div>

              <div className="mt-1 ml-2 text-base text-black font-apple-bold">
                {exp}%
              </div>
            </div>
            <div className="flex items-center justify-center w-8/12">
              <div
                id="lv-progress"
                className="h-[20px] border border-[#FF9E5D] rounded-3xl w-full overflow-hidden"
              >
                <div
                  className="h-full bg-[#FF9E5D] transition-all ease-in-out duration-500 delay-150"
                  style={{
                    width: `${exp}%`,
                  }}
                ></div>
              </div>
            </div>
            <button onClick={() => setExp(exp + 40)}>
              경험치 올라가는 버튼
            </button>
          </div>

          <div className="flex my-6 ">
            <div className="flex flex-col items-center border-r border-[#FF9E5D] px-5 pb-3">
              <div className="font-apple-bold text-xl text-[#FF9E5D] pb-3">
                작성한 일정
              </div>
              <div className="text-3xl text-gray-600 font-apple-hard">30</div>
            </div>
            <div className="flex flex-col items-center px-5">
              <div className="font-apple-bold text-xl text-[#FF9E5D] pb-3">
                완료한 일정
              </div>
              <div className="text-3xl text-gray-600 font-apple-hard">27</div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-6">
          <div className="flex flex-col items-start mt-1 text-base">
            <p className="text-lg font-apple-bold">
              {user.nickname}
              <span className="font-apple-regular">님</span>
            </p>
            <p className="text-lg">{cheerUpMessage}</p>
          </div>
        </div>
        <div>
          <div className="text-base font-apple-bold">TODAY</div>
          {workspaceDetail.works.map((work) => {
            return (
              <div
                className="flex items-center justify-between w-full p-4 mb-3 bg-white rounded-lg box-shadow1"
                key={work.id}
              >
                <div className="flex flex-col">
                  <p className="font-apple-bold ">{work.title}</p>
                  <p className="text-sm text-gray-500 font-apple-bold">
                    {work.content}
                  </p>
                </div>
                <div>채크박스</div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default WorkspaceRightSide;
