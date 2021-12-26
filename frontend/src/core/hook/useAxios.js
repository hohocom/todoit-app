import axios from "axios";
import { loadingState } from "core/state";
import { useSetRecoilState } from "recoil";

export function useAxios() {
  const setLoading = useSetRecoilState(loadingState);

  const customAxios = async ({ method, url, data }) => {
    setLoading(true);
    const res = await axios({
      method: method,
      url: url,
      data: data ? data : null,
    })
      .then((data) => data.data)
      .catch((errMessage) => {
        setLoading(false);
        throw new Error(errMessage);
      });

    setLoading(false);
    if (res.error) {
      const error = res.error;
      console.debug(error);

      if (error.type === "EXPIRED_TOKEN") {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }

      if (error.type === "NOT_FOUND_USER") {
        alert("잘못된 접근입니다.");
        window.location.href = "/403";
      }

      alert(error.message);

      throw new Error(error.message);
    }
    return res;
  };

  return { customAxios };
}



export default useAxios;
