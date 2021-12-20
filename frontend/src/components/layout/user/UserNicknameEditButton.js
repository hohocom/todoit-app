import { useUser } from "core/hook";

function UserNicknameEditButton() {
  const { editNickname } = useUser();
  return (
    <button
      className="p-1 bg-yellow-400 rounded-md pt-1.5 text-white text-xs"
      onClick={editNickname}
    >
      닉네임 수정
    </button>
  );
}

export default UserNicknameEditButton;
