import axios from "axios";

const customAxios = async ({ method, url, data }, callback) => {
  return await axios({
    method: method,
    url: url,
    data: data ? data : null,
  })
    .then((data) => {
      if (data.data.error) {
        const error = data.data.error;
        console.debug(error);

        if (error.type === "EXPIRED_TOKEN") {
          alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
          return (window.location.href = "/login");
        }

        if (error.type === "NOT_FOUND_USER") {
          alert("잘못된 접근입니다.");
          return (window.location.href = "/403");
        }

        if (callback) callback(error.message);
        else alert(error.message);

        throw new Error(error.message);
      }
      return data.data;
    })
    .catch((errMessage) => {
      throw new Error(errMessage);
    });
};
export default customAxios;
