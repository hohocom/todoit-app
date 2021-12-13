import { useEffect } from "react/cjs/react.development";
import { particlesPlay } from "utils/particles";
import "utils/particles.min.js";

function ParticlesContainer() {
  useEffect(() => {
    particlesPlay();
  });
  return (
    <div
      id="particles-js"
      className="absolute top-0 left-0 w-full h-screen"
    ></div>
  );
}

export default ParticlesContainer;
