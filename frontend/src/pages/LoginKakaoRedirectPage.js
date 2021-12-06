import { useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

function LoginKakoRedirectPage() {
  const navigate = useNavigate()
  const { search } = useLocation()

  useEffect(() => {
    getKakaoAccessToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getKakaoAccessToken = async () => {
    const code = search.split('code=')[1]
    console.log(code)
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('client_id', process.env.REACT_APP_KAKAO_CLIENT_ID)
    params.append('redirect_uri', process.env.REACT_APP_KAKAO_REDIRECT_URL)
    params.append('code', code)

    const kakaoRes = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      withCredentials: false,
      data: params,
    })
      .then((data) => data.data)
      .catch((err) => {
        console.log(err.response)
        if (err.response.status === 500 || err.response.status === 400) {
          window.alert('카카오 서버요청이 정상적으로 처리되지 않았습니다.')
          navigate('/login')
          throw new Error('요청 에러')
        }
      })

    const formData = new FormData()
    formData.append('providerType', 'KAKAO')
    formData.append('accessToken', kakaoRes.access_token)
    const res = await axios({
      method: 'post',
      url: '/users/login-by-oauth',
      data: formData,
    }).then((data) => data.data)

    console.debug(res)
  }

  return <Navigate to="/workspaces" />
}

export default LoginKakoRedirectPage
