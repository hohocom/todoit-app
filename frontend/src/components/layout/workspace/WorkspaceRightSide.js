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
        <UserProfileContainer />
        <UserCheerUpMassgeBox />

        <div>
          <div className="mb-2 text-base font-apple-bold">Today</div>
          {workspaceDetail.works.map((work) => {
            return (
              <div className="flex justify-center" key={work.id}>
                <div className="flex items-center justify-between w-64 p-4 mb-3 bg-gray-100 rounded-lg ">
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
    </aside>
  );
}

export default WorkspaceRightSide;
