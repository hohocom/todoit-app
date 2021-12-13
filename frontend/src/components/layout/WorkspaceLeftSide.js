import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceDetailState, workspaceUIState } from "states/workspace";

function WorkspaceLeftSide() {
  const { code } = useRecoilValue(workspaceDetailState);
  const [workspaceUI, setWorkspaceUI] = useRecoilState(workspaceUIState);
  const menus = [
    {
      id: 1,
      title: "일정 관리",
      url: `/workspaces/${code}`,
    },
    {
      id: 2,
      title: "인사 관리",
      url: `/workspaces/${code}/members`,
    },
  ];

  return (
    workspaceUI.leftSideOpen && (
      <div
        className="absolute top-0 left-0 z-50 w-full h-full border-gray-300 cursor-pointer xl:static xl:w-auto bg-black/50"
        onClick={() => setWorkspaceUI({ ...workspaceUI, leftSideOpen: false })}
      >
        <aside
          className="min-w-[300px] w-full sm:w-[300px] border-r h-full p-5 bg-white cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <figure className="w-full my-5 text-4xl text-center font-apple-hard">
            TODOIT
          </figure>

          {menus.map((menu) => {
            return (
              <Link key={menu.id} to={menu.url}>
                <div className="block w-full p-2 pt-2.5 text-xl rounded-[4px] mt-0.5 hover:bg-[#FFC35E] cursor-pointer transition ease-in-out duration-100">
                  {menu.title}
                </div>
              </Link>
            );
          })}
        </aside>
      </div>
    )
  );
}

export default WorkspaceLeftSide;
