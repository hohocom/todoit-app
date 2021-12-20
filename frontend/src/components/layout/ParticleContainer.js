import { useParticles } from "core/hook";

function ParticleContainer() {
  useParticles();

  return (
    <div
      id="particles-js"
      className="absolute top-0 left-0 w-full h-screen"
    ></div>
  );
}

export default ParticleContainer;
