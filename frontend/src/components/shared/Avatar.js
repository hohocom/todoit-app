import nullProfileImg from "assets/images/null-profile.svg";

function Avatar({ thumbnailImage, size = 40, hover = true }) {
  return (
    <img
      src={thumbnailImage ? thumbnailImage : nullProfileImg}
      alt="avatar"
      className={"inline-block object-cover transition duration-150 ease-in-out bg-gray-300 rounded-full cursor-pointer".concat(
        hover === true && " ring-2 ring-white hover:ring-yellow-400"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

export default Avatar;
