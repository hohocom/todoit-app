/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";

export function useLoginEvent() {
  const navigate = useNavigate();

  const loginInit = () => {
    window.localStorage.setItem("todoit_logged_state", "ok");
  };

  const checkLoginOkThenNavToWorkspacesPage = () => {
    const result = window.localStorage.getItem("todoit_logged_state");
    if (!result) return false;

    if (result === "ok") navigate("/workspaces");
  };

  const deleteLoginState = () => {
    window.localStorage.removeItem("todoit_logged_state");
  };

  return {
    loginInit,
    checkLoginOkThenNavToWorkspacesPage,
    deleteLoginState,
  };
}
