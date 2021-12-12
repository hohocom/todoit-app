import { Link } from 'react-router-dom';
import WelcomeContainer from 'components/layout/WelcomeContainer';
import WelcomeHeader from 'components/layout/WelcomeHeader';
import WelcomeClouds from 'components/layout/WelcomeClouds';
import WelcomeIntro from 'components/layout/WelcomeIntro';

import heartImg from 'assets/images/heart.png';
import { useEffect } from 'react/cjs/react.development';
import { scrollEvent } from 'utils/scrollEvent';
import ParticlesContainer from 'components/layout/ParticlesContainer';

function WelcomePage() {
  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <WelcomeContainer>
      <WelcomeHeader>
        <Link to="/" className="flex text-xl font-apple-bold">TODOIT</Link>
        <Link to="/login">로그인</Link>
      </WelcomeHeader>
      
      <WelcomeIntro>
        <div className="z-30 flex flex-col items-center">
          {/* <img src={calendarImg} alt="img" className="w-[300px]"/> */}
          <div className="text-xl text-black">
            업무를 심플하게 관리하는 방법
          </div>
          <div className="text-6xl text-black font-apple-hard">TODOIT</div>
          <br />
          <Link
            to="/login"
            className="flex items-center justify-center px-5 py-3 text-2xl bg-gray-100 border border-c-sm"
          >
            투두잇 시작하기
            <img src={heartImg} alt="img" className="ml-1 mb-1 w-[20px]" />
          </Link>
        </div>
        <WelcomeClouds />
        <ParticlesContainer />
      </WelcomeIntro>

      {/* <div className="z-50 w-full h-screen bg-[#FFB45E]"></div> */}
    </WelcomeContainer>
  );
}

export default WelcomePage;
