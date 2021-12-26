import noneImg1 from "assets/images/noneImg1.png";
import noneImg2 from "assets/images/noneImg2.png";
import noneImg3 from "assets/images/noneImg3.png";
import noneImg4 from "assets/images/noneImg4.png";
import noneImg5 from "assets/images/noneImg5.png";
import noneImg6 from "assets/images/noneImg6.png";
import noneImg7 from "assets/images/noneImg7.png";
import noneImg8 from "assets/images/noneImg8.png";
import noneImg9 from "assets/images/noneImg9.png";
import { useState } from "react";
import { AvatarDetailCard } from ".";
// import { AvatarDetailCard } from ".";

function Avatar({ user, size = 40, hover = true }) {
  const noneImg = [
    noneImg1,
    noneImg2,
    noneImg3,
    noneImg4,
    noneImg5,
    noneImg6,
    noneImg7,
    noneImg8,
    noneImg9,
  ];

  const [open, setOpen] = useState(false);

  const closeEvent = () => {
    setOpen(false);
  };

  return (
    <>
      <img
        src={
          user.thumbnailImagePath
            ? process.env.REACT_APP_API_URL +
              "/images" +
              user.thumbnailImagePath
            : noneImg[user.id % noneImg.length]
        }
        alt="avatar"
        className={"inline-block object-cover transition duration-150 ease-in-out bg-gray-300 rounded-full cursor-pointer".concat(
          hover === true && " ring-2 ring-white hover:ring-[#fabb92]"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onClick={() => {
          if (!hover) return false;
          setOpen(true);
        }}
      />
      <AvatarDetailCard user={user} open={open} close={closeEvent} />
    </>
  );
}

export default Avatar;
