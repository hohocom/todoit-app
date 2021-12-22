/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "components/common";
import { useUser } from "core/hook";
import { cheerUpMessageState, workspaceDetailState } from "core/state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import bgImg from "assets/images/bg.jpg";

function WorkspaceRightSide() {
  const { user, updateUserLevel } = useUser();
  const navigate = useNavigate();
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const [cheerUpMessage, setCheerUpMessage] =
    useRecoilState(cheerUpMessageState);

  useEffect(() => {
    const timer = setMessageByMatchTimes();

    return () => {
      console.debug("타이머 종료");
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (
      cheerUpMessageState !== null ||
      cheerUpMessageState !== "" ||
      cheerUpMessageState !== " "
    ) {
      const notification = new Notification("투두잇", {
        body: cheerUpMessage,
        icon: bgImg,
      });
      setTimeout(notification.close.bind(notification), 10000);
    }
  }, [cheerUpMessage]);

  const setMessageByMatchTimes = () => {
    const RESET_TIME = 1000 * 60;
    matchMessage();
    return setInterval(() => {
      matchMessage();
    }, RESET_TIME);
  };

  const matchMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 6 && 11 > hours) {
      setCheerUpMessage("즐거운 아침이에요 :) 🐥");
    } else if (hours >= 11 && 12 > hours) {
      setCheerUpMessage("곧 점심시간이에요! 조금만 더 화이팅!! 👊");
    } else if (hours >= 12 && 13 > hours) {
      setCheerUpMessage(
        "점심 시간이에요~ 아직도 키보드에 손이 올라가있나요? 😒"
      );
    } else if (hours >= 13 && 15 > hours) {
      setCheerUpMessage(
        "이 시간만 되면 눈이 자꾸 감겨요. 🥱 다들 버틸 수 있을까요? ^.^"
      );
    } else if (hours >= 15 && 17 > hours) {
      setCheerUpMessage(
        "문도박사는 사실 박사가 아니에요. 본인이 박사라고 생각하는 것 뿐이랍니다. 😎"
      );
    } else if (hours >= 17 && 18 > hours) {
      setCheerUpMessage(
        "오늘도 고생하셨어요^^. 작업을 마무리하면서 퇴근 준비 하세요~"
      );
    } else if (hours >= 18 && 24 > hours) {
      setCheerUpMessage(
        "어, 이게 무슨 일이죠? 이 시간에 이 메세지를 보면 안되는데.. 내일을 위해 적당히 업무를 마치고 쉬세요!"
      );
    }
  };

  return (
    <aside className="min-w-[350px] max-w-[350px] h-full border-l">
      <div className="flex flex-col justify-start w-full h-full p-5 bg-white">
        <div className="flex items-center justify-between w-full mb-10">
          <div className="font-apple-bold">My Profile</div>
          <i
            className="far fa-edit text-[#FF9E5D] text-2xl cursor-pointer"
            onClick={() => navigate("/workspaces")}
          ></i>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-[120px] h-[120px] flex justify-center items-center">
            <div className="absolute top-0 w-2 h-2 bg-yellow-300 rounded-full -right-8"></div>
            <div className="absolute w-3 h-3 bg-green-300 rounded-full top-12 -right-16"></div>
            <div className="absolute bottom-0 w-4 h-4 bg-blue-400 rounded-full -right-8"></div>
            <div className="absolute top-0 w-4 h-4 bg-red-300 rounded-full -left-8"></div>
            <div className="absolute w-2 h-2 bg-red-400 rounded-full top-12 -left-16"></div>
            <div className="absolute bottom-0 w-3 h-3 bg-purple-400 rounded-full -left-8"></div>
            <div
              className="absolute w-[120px] h-[120px] rounded-full  flex items-center justify-center border-2 hover-spin
          border-l-[#F5A9BC] border-t-[#F781BE] border-b-[#FF9E5D] border-r-[#FF9E5D] z-10"
            ></div>
            <div className="absolute flex items-center justify-center w-full h-full">
              <Avatar
                thumbnailImage={user.thumbnailImage}
                size={100}
                hover={false}
              />
            </div>
          </div>
          <div className="mt-4 text-xl text-black font-apple-hard">
            {user.nickname}
          </div>
          <div className="text-base text-gray-600 font-apple-bold">
            Developer
          </div>

          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex items-center justify-between w-10/12 mt-2 -mb-1 text-gray-600 font-apple-hard">
              <div>
                <span className="text-2xl">{user.level}</span>
                <span className="text-base">&nbsp;LVL</span>
              </div>
              <div className="mt-1 ml-2 text-base text-black font-apple-bold">
                {user.exp}%
              </div>
            </div>
            <div className="flex items-center justify-center w-10/12">
              <div
                id="lv-progress"
                className="h-4 w-full overflow-hidden bg-yellow-300 rounded-[4px]"
              >
                <div
                  className="h-full bg-[#FF9E5D] transition-all ease-in-out duration-500 delay-150"
                  style={{
                    width: `${user.exp}%`,
                  }}
                ></div>
              </div>
            </div>
            {/* <button
              onClick={() => updateUserLevel(Math.floor(100 / user.level))}
            >
              경험치 올라가는 버튼
            </button> */}
          </div>
        </div>
        <div className="mt-6 mb-6 bg-gray-50 p-2 rounded-[4px]">
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
                className="flex items-center justify-between w-full p-4 mb-3 bg-white rounded-lg"
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
