import { Avatar } from "components/common";

function AvatarDetailCard({ user, open, close }) {
  return (
    open && (
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full cursor-pointer bg-black/70"
        onClick={close}
      >
        <div className="flex flex-col items-center justify-center w-full lg:w-[300px] bg-white p-2 pt-12 pb-6 rounded-md group">
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
              <Avatar size={108} hover={false} user={user} />
            </div>
          </div>
          <div className="mt-4 text-xl text-black font-apple-hard">
            {user.nickname}
          </div>
          <div className="text-base text-gray-600 font-apple-bold">
            {user.email}
          </div>

          <div className="flex items-center justify-center w-full mt-4">
            <span className="text-5xl font-apple-hard">{user.level}</span>
            <span className="text-base font-apple-regular">&nbsp;LVL</span>
          </div>
        </div>
      </div>
    )
  );
}

export default AvatarDetailCard;
