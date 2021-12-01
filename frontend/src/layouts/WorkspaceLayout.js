function WorkspaceLayout({ children }) {
  return (
    <div className="fixed top-0 left-0 flex w-full h-full font-apple-light">
      <aside className="min-w-[300px] h-full border-r border-gray-300">
        <figure className="w-full p-10 border">LOGO</figure>
      </aside>
      <main className="flex-col w-full h-full">
        <header className="w-full h-[60px] border-b"></header>
        <section className="w-full h-full overflow-y-scroll border-2 border-red-500 pb-[100px]">
          {children}
        </section>
      </main>
      <aside className="min-w-[500px] h-full border-l"></aside>
    </div>
  )
}

export default WorkspaceLayout
