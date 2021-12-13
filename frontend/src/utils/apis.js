import axios from "axios";

export const apiScaffold = async ({ method, url, data }, callback) => {
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
