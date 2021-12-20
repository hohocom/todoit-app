function WorkFormContent({ content, inputChange }) {
  return (
    <textarea
      type="text"
      name="content"
      className="w-full h-24 p-1 overflow-y-scroll border rounded-md custom-scroll
        focus:ring-offset-[#ff925d] focus:ring-[#fc9765]
        focus:ring-1 focus:ring-offset-1 transition ease-in duration-200 outline-none"
      placeholder="내용"
      value={content}
      onChange={inputChange}
    />
  );
}

export default WorkFormContent;
