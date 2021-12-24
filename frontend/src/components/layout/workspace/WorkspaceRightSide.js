/* eslint-disable react-hooks/exhaustive-deps */
import { workspaceDetailState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  UserCheerUpMassgeBox,
  UserProfileContainer,
} from "components/layout/user";
import { CheckBox } from "components/common";

function WorkspaceRightSide() {
<<<<<<< HEAD
=======
  const { user, updateUserLevel } = useUser();

>>>>>>> 1659f547141ba2819e152f8b5f3afdc3d3468643
  const navigate = useNavigate();
  const workspaceDetail = useRecoilValue(workspaceDetailState);

  return (
    <aside className="min-w-[320px] max-w-[320px] h-full border-l">
      <div className="flex flex-col justify-start w-full h-full p-5 bg-white">
        <div className="flex items-center justify-between w-full mb-10">
          <div className="font-apple-bold">My Profile</div>
          <i
            className="far fa-edit text-[#FF9E5D] text-2xl cursor-pointer"
            onClick={() => navigate("/workspaces")}
          ></i>
        </div>
<<<<<<< HEAD
        <UserProfileContainer />
        <UserCheerUpMassgeBox />
=======
        <div className="flex flex-col items-center justify-center w-full group">
          <div className="relative w-[120px] h-[120px] flex justify-center items-center">
            <div className="absolute top-0 w-2 h-2 bg-yellow-300 rounded-full -right-8 group-hover:animate-bounce"></div>
            <div className="absolute w-3 h-3 bg-green-300 rounded-full top-12 -right-16 group-hover:animate-bounce"></div>
            <div className="absolute bottom-0 w-4 h-4 bg-blue-400 rounded-full -right-8 group-hover:animate-bounce"></div>
            <div className="absolute top-0 w-4 h-4 bg-red-300 rounded-full -left-8 group-hover:animate-bounce"></div>
            <div className="absolute w-2 h-2 bg-red-400 rounded-full top-12 -left-16 group-hover:animate-bounce"></div>
            <div className="absolute bottom-0 w-3 h-3 bg-purple-400 rounded-full -left-8 group-hover:animate-bounce"></div>
            <div
              className="absolute w-[120px] h-[120px] rounded-full  flex items-center justify-center border-2 group-hover:animate-spin
          border-l-[#F5A9BC] border-t-[#F781BE] border-b-[#FF9E5D] border-r-[#FF9E5D] z-10"
            ></div>
            <div className="absolute flex items-center justify-center w-full h-full">
              <Avatar
                userId={user.id}
                thumbnailImage={user.thumbnailImage}
                size={108}
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
>>>>>>> 1659f547141ba2819e152f8b5f3afdc3d3468643

        <div>
<<<<<<< HEAD
          <div className="mb-2 text-base font-apple-bold">Today</div>
          {workspaceDetail.works.map((work) => {
            return (
              <div className="flex justify-center" key={work.id}>
                <div className="flex items-center justify-between w-64 p-4 mb-3 bg-gray-100 rounded-lg ">
=======
          <div className="text-base font-apple-bold mb-2">Today</div>
          <div className="overflow-y-scroll h-[230px] custom-scroll "> 
          {workspaceDetail.works.map((work) => {
            return (
              <div className="flex justify-center ">
                <div
                  className="flex items-center justify-between w-64 p-4 mb-3  bg-gray-100 rounded-lg "
                  key={work.id}
                >
>>>>>>> 1659f547141ba2819e152f8b5f3afdc3d3468643
                  <div className="flex flex-col">
                    <p className="font-apple-bold ">{work.title}</p>
                    <p className="text-sm text-gray-500 font-apple-bold">
                      {work.content}
                    </p>
                  </div>
                  <CheckBox value={work.isFinished} />
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default WorkspaceRightSide;
