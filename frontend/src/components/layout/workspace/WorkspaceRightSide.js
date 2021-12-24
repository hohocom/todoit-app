/* eslint-disable react-hooks/exhaustive-deps */
import { workspaceDetailState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserCheerUpMassgeBox, UserProfileContainer } from "../user";

function WorkspaceRightSide() {
  const navigate = useNavigate();
  const workspaceDetail = useRecoilValue(workspaceDetailState);

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
        <UserProfileContainer />
        <UserCheerUpMassgeBox />
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
