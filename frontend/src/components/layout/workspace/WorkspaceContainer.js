function WorkspaceContainer({ children }) {
  return (
    <div className="fixed top-0 left-0 flex w-full h-full font-apple-light">
      {children}
    </div>
  );
}

export default WorkspaceContainer;
