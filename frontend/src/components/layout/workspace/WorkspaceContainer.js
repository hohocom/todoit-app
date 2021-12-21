import { EmojiToast } from "components/common";
import { useEmojiToast } from "core/hook";

function WorkspaceContainer({ children }) {
  const { emojiToast, reset } = useEmojiToast();
  return (
    <div className="fixed top-0 left-0 flex w-full h-full font-apple-light">
      {children}
      {/* <FireWorkContainer /> */}
      <EmojiToast toast={emojiToast} resetToast={reset} />
    </div>
  );
}

export default WorkspaceContainer;
