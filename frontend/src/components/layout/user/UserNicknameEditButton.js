import customAxios from "core/api";
import { useRecoilState } from "recoil";
import { userState } from "core/state";

function UserNicknameEditButton() {
  const [user, setUser] = useRecoilState(userState);
  return (
    <button
      className="p-1 bg-yellow-400 rounded-md pt-1.5 text-white text-xs"
      onClick={async () => {
        const newNickname = window.prompt(
          "바꿀 닉네임을 입력해주세요.",
          user.nickname
        );
        if (!newNickname) return false;
        const formData = new FormData();
        formData.append("nickname", newNickname);
        const { updateUserInfo } = await customAxios({
          method: "put",
          url: `/users/${user.id}`,
          data: formData,
        });
        setUser({
          ...user,
          nickname: updateUserInfo.nickname,
        });
      }}
    >
      닉네임 수정
    </button>
  );
}

export default UserNicknameEditButton;
