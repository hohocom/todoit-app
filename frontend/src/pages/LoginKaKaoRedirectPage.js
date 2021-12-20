import { ParticleContainer } from "components/layout";
import { ThemeContainer } from "components/layout/theme";
import { useKakaoApi } from "core/hook";

function KakaoRedirectPage() {
  useKakaoApi();
  return (
    <ThemeContainer>
      <ParticleContainer />
    </ThemeContainer>
  );
}

export default KakaoRedirectPage;
