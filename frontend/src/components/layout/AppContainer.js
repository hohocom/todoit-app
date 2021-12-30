import { EmojiToast, Toast } from "components/common";
import { useCheerUpMessageInit, useEmojiToast, useToast } from "core/hook";
import { LoadingContainer } from ".";

function AppContainer({ children }) {
  useCheerUpMessageInit();
  const { emojiToast, resetEmojiToast } = useEmojiToast();
  const { toast, resetToast } = useToast();
  return (
    <>
      {children}
      <LoadingContainer />
      <EmojiToast toast={emojiToast} resetToast={resetEmojiToast} />
      <Toast toast={toast} resetToast={resetToast} />
    </>
  );
}

export default AppContainer;
