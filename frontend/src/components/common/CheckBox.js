function CheckBox({ changeEvent, value }) {
  return (
    <div
      className="flex items-center justify-center w-8 h-8 bg-white border rounded-full cursor-pointer"
      onClick={changeEvent}
    >
      {value === 1 && <i className="fas fa-check text-[#FFC35E]"></i>}
    </div>
  );
}

export default CheckBox;
