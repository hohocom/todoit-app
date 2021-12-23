import nullProfileImg from "assets/images/null-profile.svg";
import noneImg from "assets/images/noneImg.png";
function Avatar({ thumbnailImage, size = 40, hover = true }) {
  return (
    <img
      src={thumbnailImage ? process.env.REACT_APP_API_URL+"/images"+thumbnailImage : noneImg}
      alt="avatar"
      className={"inline-block object-cover transition duration-150 ease-in-out bg-gray-300 rounded-full cursor-pointer".concat(
        hover === true && " ring-2 ring-white hover:ring-[#fabb92]"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

export default Avatar;
