/* eslint-disable array-callback-return */
import Avatar from "./Avatar";

function AvatarGroup({ items, space = "m" }) {
  return (
    <div className="relative flex">
      <div
        className={`flex
          ${space === "s" && "-space-x-6"}
          ${space === "m" && "-space-x-4"}
          ${space === "l" && "-space-x-2"}
        `}
      >
        {items.length >= 1 &&
          items.map((user, index) => {
            if (index <= 2) {
              return (
                <Avatar
                  key={index}
                  userId={user.id}
                  originImage={user.originImage}
                  thumbnailImage={user.thumbnailImage}
                  userName={user.name}
                />
              );
            }
          })}
      </div>
      {items.length >= 4 && (
        <button
          className="hover:text-[#FF9E5D] mt-1 ml-1"
          onClick={() => {
            document.querySelector(
              "#avatarGroupModalBackground"
            ).style.display = "block";
            document.querySelector("#avatarGroupModal").style.display = "block";
          }}
        >
          +{items.length - 3}명
        </button>
      )}
      <div
        id="avatarGroupModalBackground"
        className="fixed top-0 left-0 z-40 hidden w-full h-full"
        onClick={(e) => {
          const backgroundEl = e.target;
          backgroundEl.style.display = "none";
          const seletorEl = backgroundEl.nextSibling;
          seletorEl.style.display = "none";
        }}
      ></div>
      <div
        id="avatarGroupModal"
        className="hidden absolute min-w-[150px] p-2 bg-white rounded-md z-50 border"
      >
        {items.map((item) => {
          return (
            <div
              className="flex items-center justify-start w-full mb-2"
              key={item.id}
            >
              <Avatar thumbnailImage={item.thumbnailImage} />
              <div className="mt-1 ml-1 text-xs">{item.nickname}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AvatarGroup;
