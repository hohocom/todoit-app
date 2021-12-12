import { Link } from 'react-router-dom';

function WelcomeHeader() {
  return (
    <header className="fixed left-0 top-0 w-full h-[70px] flex justify-center z-50 transition-all delay-100">
      <div className="w-full px-5 lg:w-[1200px] h-full flex justify-between items-center">
        <Link to="/" className="flex text-xl font-apple-bold">
          {/* <img src={logoImg} alt="img" className="w-[40px] rounded-md"/> */}
          TODOIT
        </Link>
        <Link to="/login">로그인</Link>
      </div>
    </header>
  );
}

export default WelcomeHeader;
