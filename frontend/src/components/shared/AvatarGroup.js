/* eslint-disable array-callback-return */
import { useEffect } from "react";
import Avatar from "./Avatar";

function AvatarGroup({ items, space = "m" }) {
  useEffect(() => {}, []);

  return (
    <div className="flex relative">
      <div
        className={`flex
          ${space === "s" && "-space-x-6"}
          ${space === "m" && "-space-x-4"}
          ${space === "l" && "-space-x-2"}
        `}
      >
        {items.length >= 1 &&
          items.map((user, index) => {
            console.log(user);
            if (index <= 2) {
              return (
                <Avatar
                  key={index}
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
        className="fixed left-0 top-0 w-full h-full z-40"
        onClick={(e) => {
          const backgroundEl = e.target;
          backgroundEl.style.display = "none";
          const seletorEl = backgroundEl.nextSibling;
          seletorEl.style.display = "none";
        }}
      ></div>
      <div
        id="avatarGroupModal"
        className="absolute -bottom-10 min-w-[120px] p-2 bg-white rounded-md z-50 border"
      >
        hello world!
      </div>
    </div>
  );
}
export default AvatarGroup;
