import { useNavigate } from "react-router-dom";
import { apiScaffold } from "utils/apis";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = async () => {
    const res = await apiScaffold({
      method: "GET",
      url: "/users/logout",
    });
    console.debug(res);
    navigate("/");
  };

  return (
    <button className="hover:text-[#ffac5ef3] text-sm" onClick={logout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
