function WorkFormTitle({ title, inputChange }) {
  return (
    <input
      type="text"
      name="title"
      className="w-full h-10 p-1 mb-2 border rounded-md 
        focus:ring-offset-[#ff925d] focus:ring-[#fc9765]
        focus:ring-1 focus:ring-offset-1 transition ease-in duration-200 outline-none"
      placeholder="일정"
      value={title}
      onChange={inputChange}
    />
  );
}

export default WorkFormTitle;
