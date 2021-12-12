function ThemeContainer({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-[#FFC35E] to-[#ffac5ef3] font-apple-regular text-[#424242]">
      {children}
    </div>
  );
}

export default ThemeContainer;
