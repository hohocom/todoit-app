import { Avatar } from "components/common";
import { useUser } from "core/hook";

function UserProfileContainer() {
  const { user } = useUser();

  return (
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
            thumbnailImage={user.thumbnailImage}
            size={108}
            hover={false}
          />
        </div>
      </div>
      <div className="mt-4 text-xl text-black font-apple-hard">
        {user.nickname}
      </div>
      <div className="text-base text-gray-600 font-apple-bold">Developer</div>

      <div className="flex flex-col items-center justify-start w-full">
        <div className="flex items-center justify-between w-10/12 mt-2 -mb-1 text-black font-apple-hard">
          <div>
            <span className="text-base">{user.level}</span>
            <span className="text-base">&nbsp;LVL</span>
          </div>
          <div className="mt-1 ml-2 text-base text-black font-apple-bold">
            {user.exp}%
          </div>
        </div>
        <div className="flex items-center justify-center w-10/12 mt-1">
          <div
            id="lv-progress"
            className="w-full h-4 overflow-hidden bg-gray-200 rounded-full"
          >
            <div
              className="h-full bg-[#FF9E5D] transition-all ease-in-out duration-500 delay-150"
              style={{
                // width: `30%`,
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
  );
}

export default UserProfileContainer;
