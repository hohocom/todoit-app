import { useRecoilState, useResetRecoilState } from "recoil";
import { emojiToastState, toastState } from "core/state";

export function useToast() {
  const [toast, setToast] = useRecoilState(toastState);
  const resetToast = useResetRecoilState(toastState);

  return { toast, setToast, resetToast };
}

export function useEmojiToast() {
  const [emojiToast, setEmojiToast] = useRecoilState(emojiToastState);
  const resetEmojiToast = useResetRecoilState(emojiToastState);

  return { emojiToast, setEmojiToast, resetEmojiToast };
}
