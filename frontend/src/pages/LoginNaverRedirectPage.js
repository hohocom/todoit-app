import { ParticleContainer } from "components/layout";
import { ThemeContainer } from "components/layout/theme";
import { useNaverApi } from "core/hook";

function NaverRedirectPage() {
  useNaverApi();
  return (
    <ThemeContainer>
      <ParticleContainer />
    </ThemeContainer>
  );
}

export default NaverRedirectPage;
