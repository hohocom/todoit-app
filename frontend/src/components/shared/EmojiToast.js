import happyEmojiImg from "assets/images/emoji-cong.png";
import heartEmojiImg from "assets/images/emoji-heart.png";
import sadEmojiImg from "assets/images/emoji-sad.png";
import starEmojiImg from "assets/images/emoji-star.png";
import { useEffect } from "react";

function EmojiToast({ toast, resetToast }) {
    useEffect(() => {
        if (toast.open) {
          const timer = setTimeout(() => {
            resetToast();
          }, toast.second);
          return () => {
            clearTimeout(timer);
          };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast]);
    
    let emoji = happyEmojiImg;
    if (toast.type === "STAR") emoji = starEmojiImg;
    else if (toast.type === "SAD") emoji = sadEmojiImg;
    else if (toast.type === "HEART") emoji = heartEmojiImg;

    return(
        toast.open &&
        <div className="fixed bottom-0 left-0 flex flex-col items-center justify-center p-4 mb-10 ml-10 bg-white border rounded-xl box-shadow2 animate-bounce">
            <img src={emoji} alt="img" className="w-[100px] -mt-10"/>
            <p className="text-xs font-noto-thin">데이터를 불러올 수 없습니다.</p>
        </div>
    )
}

export default EmojiToast