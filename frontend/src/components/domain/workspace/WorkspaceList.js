import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "states/user";
import WorkspaceDeleteButton from "./WorkspaceDeleteButton";
import WorkspaceUpdateButton from "./WorkspaceUpdateButton";

function WorkspaceList() {
  const [user, setUser] = useRecoilState(userState);

  return user.workspaces.length > 0 ? (
    user.workspaces.map((workspace, index) => {
      return (
        <div
          className="relative border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2"
          key={workspace.id}
        >
          <Link
            to={`/workspaces/${workspace.code}`}
            id="title"
            className="flex flex-col p-3 mt-1 cursor-pointer hover:text-yellow-500 font-apple-bold"
          >
            <div>{workspace.name}</div>
            <div className="text-xs text-gray-600 font-apple-regular">
              {workspace.code}
            </div>
          </Link>
          <div className="p-3">
            <WorkspaceUpdateButton
              setUser={setUser}
              user={user}
              workspace={workspace}
            />
            <WorkspaceDeleteButton
              setUser={setUser}
              user={user}
              workspace={workspace}
            />
          </div>
        </div>
      );
    })
  ) : (
    <div className="w-full p-2 pt-2.5 border rounded-md bg-gray-50">
      워크스페이스가 없습니다. 새로 생성하거나 초대 코드로 가입해보세요!🎈
    </div>
  );
}

export default WorkspaceList;
