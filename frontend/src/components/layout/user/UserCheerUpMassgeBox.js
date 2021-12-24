import { useCheerUpMessage, useUser } from "core/hook";

function UserCheerUpMessageBox() {
  const { user } = useUser();
  const { cheerUpMessage } = useCheerUpMessage();
  return (
    <div className="mt-6 mb-6  rounded-[4px]   flex justify-center">
      <div className="flex flex-col items-start w-64 mt-1 text-base ">
        <p className="text-lg font-apple-bold">
          {user.nickname}
          <span className="font-apple-regular">님</span>
        </p>
        <p className="text-sm">{cheerUpMessage}</p>
      </div>
    </div>
  );
}

export default UserCheerUpMessageBox;
