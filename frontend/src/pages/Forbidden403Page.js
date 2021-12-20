import { ParticleContainer } from "components/layout";
import { ThemeContainer, ThemeTitleBox } from "components/layout/theme";
import { Link } from "react-router-dom";

function Forbidden403Page() {
  return (
    <ThemeContainer>
      <ThemeTitleBox>
        <h1 className="text-6xl font-shadow2">403</h1>
        <h2 className="text-3xl font-shadow2">Forbidden</h2>

        <Link to="/">
          <button
            className="text-xl px-4 pt-1 bg-yellow-500 rounded-[4px] 
    mt-5 hover:ring-yellow-300 hover:ring-offset-yellow-400 
    hover:ring-2 hover:ring-offset-2 transition ease-in duration-200"
          >
            Go to home
          </button>
        </Link>
      </ThemeTitleBox>
      <ParticleContainer />
    </ThemeContainer>
  );
}

export default Forbidden403Page;
