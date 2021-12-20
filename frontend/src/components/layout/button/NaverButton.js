import { useNaverButton } from "core/hook";

function NaverButton() {
  useNaverButton();
  return (
    <div
      id="naverIdLogin"
      className="w-full h-[60px] pt-1 mt-2 flex justify-center items-center bg-[#03C75A] color-white rounded-[4px]"
    ></div>
  );
}

export default NaverButton;
