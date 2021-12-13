import { Link } from "react-router-dom";

function WelcomeHeader({ children }) {
  return (
    <header className="fixed left-0 top-0 w-full h-[70px] flex justify-center z-50 transition-all delay-100">
      <div className="w-full px-5 lg:w-[1200px] h-full flex justify-between items-center">
        {children}
      </div>
    </header>
  );
}

export default WelcomeHeader;
