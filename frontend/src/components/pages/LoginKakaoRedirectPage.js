import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { particlesPlay } from 'utils/particles'
import 'utils/particles.min.js'

function LoginKakoRedirectPage() {
  const navigate = useNavigate()
  const { search } = useLocation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    particlesPlay()
    const kakaoAccessToken = await getKakaoAccessToken()
    await getTotoitAccessToken(kakaoAccessToken)
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

    return kakaoRes.access_token
  }

  const getTotoitAccessToken = async (kakaoAccessToken) => {
    const formData = new FormData()
    formData.append('providerType', 'KAKAO')
    formData.append('accessToken', kakaoAccessToken)
    const res = await axios({
      method: 'post',
      url: '/users/login-by-oauth',
      data: formData,
    })
      .then((data) => data.data)
      .catch((err) => {
        window.alert(
          '투두잇 서버요청에 문제가 발생하였습니다.\n잠시후 다시 시도해주세요.',
        )
        navigate('/login')
        throw new Error(err)
      })

    console.debug(res)

    navigate('/workspaces')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-[#FFC35E] to-[#ffac5ef3] font-apple-regular text-[#424242]">
      <div
        id="particles-js"
        className="absolute top-0 left-0 w-full h-screen"
      ></div>
    </div>
  )
}

export default LoginKakoRedirectPage
