import { useLoginEvent, useUserLogout } from "core/hook";

function UserLogoutButton() {
  const { logout } = useUserLogout();
  const { deleteLoginState } = useLoginEvent();
  return (
    <button
      className="hover:text-[#ffac5ef3] text-sm"
      onClick={() => {
        deleteLoginState();
        logout();
      }}
    >
      로그아웃
    </button>
  );
}

export default UserLogoutButton;
