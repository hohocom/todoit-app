import { EmojiToast } from "components/common";
import { useCheerUpMessageInit, useEmojiToast } from "core/hook";
import { LoadingContainer } from ".";

function AppContainer({ children }) {
  // useCheerUpMessageInit();
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
