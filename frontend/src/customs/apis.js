import axios from 'axios'

export const apiScaffold = async ({ method, url, data }, callback) => {
  return await axios({
    method: method,
    url: url,
    data: data ? data : null,
  })
    .then((data) => {
      if (data.data.error) {
        const error = data.data.error

        if (error.type === 'EXPIRED_TOKEN') {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          return (window.location.href = '/login')
        }

        if (callback) callback(error.message)
        throw new Error(error.message)
      }
      return data.data
    })
    .catch((errMessage) => {
      throw new Error(errMessage)
    })
}

export const refreshToken = async () => {
  const res = await apiScaffold({
    method: 'get',
    url: '/users/refresh-token-test/2',
  })
  console.debug(res)
  // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  axios.defaults.headers.common['Authorization'] = `bearer ${res.act.token}`
  return { userId: res.act.id }
}
