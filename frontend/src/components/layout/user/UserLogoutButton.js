import { useUserLogout } from "core/hook";

function UserLogoutButton() {
  const { logout } = useUserLogout();
  return (
    <button className="hover:text-[#ffac5ef3] text-sm" onClick={logout}>
      로그아웃
    </button>
  );
}

export default UserLogoutButton;
