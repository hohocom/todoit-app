/* eslint-disable array-callback-return */
import { AvatarGourpSelector } from ".";
import Avatar from "./Avatar";

function AvatarGroup({ users, space = "m" }) {
  return (
    <div className="relative flex">
      <div
        className={`flex
          ${space === "s" && "-space-x-6"}
          ${space === "m" && "-space-x-4"}
          ${space === "l" && "-space-x-2"}
        `}
      >
        {users.length >= 1 &&
          users.map((user, index) => {
            if (index <= 2) {
              return <Avatar key={index} user={user} />;
            }
          })}
      </div>
      {users.length >= 4 && (
        <button
          className="hover:text-[#FF9E5D] mt-1 ml-1"
          onClick={() => {
            document.querySelector(
              "#avatarGroupModalBackground"
            ).style.display = "block";
            document.querySelector("#avatarGroupModal").style.display = "block";
          }}
        >
          +{users.length - 3}명
        </button>
      )}
      <AvatarGourpSelector users={users} />
    </div>
  );
}
export default AvatarGroup;
