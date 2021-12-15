/* eslint-disable array-callback-return */
import { useEffect } from "react";
import Avatar from "./Avatar";

function AvatarGroup({ items, space = "m" }) {
  useEffect(() => {}, []);

  return (
    <div className="flex">
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
        <button className="hover:text-[#FF9E5D] mt-1 ml-1">
          +{items.length - 3}명
        </button>
      )}
    </div>
  );
}
export default AvatarGroup;
