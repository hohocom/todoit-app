import rocketImg from "assets/images/rocket.svg";
import { useNavChange } from "core/hook";
import { Link } from "react-router-dom";

function WorkspaceLeftSide() {
  const { workspaceUI, changeMenu, getMenuIndex } = useNavChange();

  return (
    <div className="flex flex-col items-center min-w-[100px] w-[100px] xl:min-w-[280px] border-r sm:flex-row sm:justify-around bg-white">
      <div className="w-full h-screen xl:px-6">
        <div className="flex items-center justify-center my-10 xl:justify-start">
          <img src={rocketImg} alt="img" className="w-10" />
          <span className="hidden ml-4 text-3xl text-black font-apple-hard xl:block">
            TODOIT
          </span>
        </div>
        <nav className="mt-3 ">
          {workspaceUI.menus.map((menu) => {
            return (
              <Link
                to={menu.url}
                key={menu.id}
                onClick={() => {
                  changeMenu(menu.id);
                }}
              >
                <div
                  className={`flex justify-center xl:justify-start items-center p-2 my-4 mx-4 xl:mx-0 text-gray-600 transition-colors duration-200 
                      rounded-lg menu-item hover:text-gray-800 
                      hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 `.concat(
                    getMenuIndex() === menu.id && "bg-gray-100 text-gray-800"
                  )}
                >
                  {menu.icon}
                  <span className="hidden mx-4 mt-1 text-lg font-normal xl:block">
                    {menu.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 hidden my-10 xl:block">
          <button
            className="flex items-center py-2 text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <svg
              width="20"
              fill="currentColor"
              height="20"
              className="w-5 h-5"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
            </svg>
            <span className="font-medium ">Patch Note</span> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceLeftSide;
