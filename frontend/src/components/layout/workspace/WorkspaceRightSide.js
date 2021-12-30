/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from "react-router-dom";

import {
  UserCheerUpMassgeBox,
  UserProfileContainer,
} from "components/layout/user";
import { TodayWorkList } from "../work";

function WorkspaceRightSide() {
  const navigate = useNavigate();

  return (
    <aside className="min-w-[320px] max-w-[320px] h-full border-l relative border flex flex-col bg-white">
      <div className="flex flex-col justify-start w-full h-full p-5 ">
        <div className="flex items-center justify-between w-full mb-10">
          <div className="font-apple-bold">My Profile</div>
          <i
            className="far fa-edit text-[#FF9E5D] text-2xl cursor-pointer"
            onClick={() => navigate("/workspaces")}
          ></i>
        </div>
        <UserProfileContainer />
        <UserCheerUpMassgeBox />
      </div>
      <TodayWorkList />
    </aside>
  );
}

export default WorkspaceRightSide;
