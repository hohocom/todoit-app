/* eslint-disable array-callback-return */
import { useEffect } from "react";
import Avatar from "./Avatar";

function AvatarGroup({ items }) {
  useEffect(() => {}, []);

  return (
    <div className="flex -space-x-2">
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
      {items.length >= 4 && (
        <button className="ml-6 hover:text-indigo-500">
          +{items.length - 3}명
        </button>
      )}
    </div>
  );
}
export default AvatarGroup;
