import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

function LoginNaverRedirectPage() {
  const { hash } = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getNaverAccessByQuerystring();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNaverAccessByQuerystring = () => {
    console.log(hash);
    const querystringArray = hash.split("#access_token=")[1];
    const accessToken = querystringArray.split("&")[0];
    console.log(accessToken);
  };

  return <Navigate to="/workspaces" />;
}

export default LoginNaverRedirectPage;
