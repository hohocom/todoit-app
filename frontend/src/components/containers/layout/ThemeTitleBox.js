function ThemeTitleBox({ children }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-2xl text-white py-14 sm:text-4xl sm:py-5 font-apple-hard">
      {children}
    </div>
  );
}

export default ThemeTitleBox;
