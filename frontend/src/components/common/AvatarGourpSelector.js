import { Avatar } from ".";

function AvatarGroupSelector({ users }) {
  return (
    <>
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
        {users.map((user) => {
          return (
            <div
              className="flex items-center justify-start w-full mb-2"
              key={user.id}
            >
              <Avatar user={user} />
              <div className="mt-1 ml-1 text-xs">{user.nickname}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AvatarGroupSelector;
