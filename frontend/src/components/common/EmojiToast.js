import happyEmojiImg from "assets/images/emoji-cong.png";
import heartEmojiImg from "assets/images/emoji-heart.png";
import sadEmojiImg from "assets/images/emoji-sad.png";
import starEmojiImg from "assets/images/emoji-star.png";
import { FireWorkContainer } from "components/layout";

function EmojiToast({ toast = { type: "HAPPY" }, resetToast }) {
  let emoji = happyEmojiImg;
  if (toast.type === "HAPPY") emoji = happyEmojiImg;
  else if (toast.type === "STAR") emoji = starEmojiImg;
  else if (toast.type === "SAD") emoji = sadEmojiImg;
  else if (toast.type === "HEART") emoji = heartEmojiImg;

  return (
    toast.open && (
      <div
        className="fixed top-0 left-0 z-40 flex items-center justify-center w-full h-full cursor-pointer bg-black/80"
        onClick={() => {
          resetToast();
        }}
      >
        <div
          className="max-w-[300px] p-4 bg-white rounded-[4px] flex flex-col justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={emoji} alt="img" className="-mt-24" />
          <p className="font-apple-regular text-[#2E2E2E]">{toast.message}</p>
          <div className="flex justify-end w-full">
            <div className="hover:text-yellow-500 font-apple-bold text-[#2E2E2E]" onClick={() => resetToast()}>
              닫기
            </div>
          </div>
        </div>
        {toast.type === "HAPPY" && <FireWorkContainer />}
      </div>
    )
  );
}

export default EmojiToast;
