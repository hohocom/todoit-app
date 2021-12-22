import { loadingState } from "core/state";
import { useRecoilValue } from "recoil";
import "styles/loading.css";

function LoadingContainer() {
  const loading = useRecoilValue(loadingState);
  return (
    loading && (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white/80">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    )
  );
}

export default LoadingContainer;
