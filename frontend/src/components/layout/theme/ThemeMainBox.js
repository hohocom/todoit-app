function ThemeMainBox({ children }) {
  return (
    <div
      className="w-full sm:w-[400px] h-full sm:h-auto bg-white rounded-t-3xl 
    rounded-b-none sm:rounded-xl flex flex-col justify-start items-center p-4 pt-5 z-10 box-shadow1"
    >
      {children}
    </div>
  );
}

export default ThemeMainBox;
