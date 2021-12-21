import { useRecoilState, useResetRecoilState } from "recoil";
import { emojiToastState } from "core/state";

export function useToast() {}

export function useEmojiToast() {
  const [emojiToast, setEmojiToast] = useRecoilState(emojiToastState);
  const reset = useResetRecoilState(emojiToastState);

  return { emojiToast, setEmojiToast, reset };
}
