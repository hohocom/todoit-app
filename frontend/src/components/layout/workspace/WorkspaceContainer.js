import { useWorkInit } from "core/hook";

function WorkspaceContainer({ children }) {
  useWorkInit();
  return (
    <div className="fixed top-0 left-0 flex w-full h-full bg-gray-100 font-apple-light">
      {children}
    </div>
  );
}

export default WorkspaceContainer;
