import { EmojiToast } from "components/common";
import { useEmojiToast } from "core/hook";
import { LoadingContainer } from ".";

function AppContainer({ children }) {
  const { emojiToast, reset } = useEmojiToast();
  return (
    <>
      {children}
      <LoadingContainer />
      <EmojiToast toast={emojiToast} resetToast={reset} />
    </>
  );
}

export default AppContainer;
