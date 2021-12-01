import { Link } from 'react-router-dom'
import logoImg from '../assets/images/logo/logo01.png'

function WelcomeLayout({ children }) {
  return (
    <div className="flex-col items-start justify-center w-full h-full font-apple-regular text-[#424242]">
      <header className="fixed left-0 top-0 w-full h-[70px] flex justify-center border-b border-gray-200 z-50">
        <div className="w-full px-5 lg:w-[1200px] h-full flex justify-between items-center">
          <Link to="/" className="flex text-xl font-apple-bold">
            {/* <img src={logoImg} alt="img" className="w-[40px] rounded-md"/> */}
            TODOIT
          </Link>
          <Link to="/login">로그인</Link>
        </div>
      </header>
      <section className="w-full">{children}</section>
    </div>
  )
}

export default WelcomeLayout
