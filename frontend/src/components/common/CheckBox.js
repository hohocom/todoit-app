function CheckBox(changeEvent, value = false) {
  return (
    <div className="flex items-center justify-center w-5 h-5 bg-white border rounded-full cursor-pointer">
      {value && <i className="fas fa-check text-[#FFC35E]"></i>}
    </div>
  );
}

export default CheckBox;
