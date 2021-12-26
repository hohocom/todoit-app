/* eslint-disable react-hooks/exhaustive-deps */
import { cheerUpMessageState } from "core/state";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useCheerUpMessageInit() {
  const setCheerUpMessage = useSetRecoilState(cheerUpMessageState);

  useEffect(() => {
    const timer = setMessageByMatchTimes();
    return () => clearInterval(timer);
  }, []);

  const setMessageByMatchTimes = () => {
    const RESET_TIME = 1000 * 60;
    matchMessage();
    return setInterval(() => {
      matchMessage();
    }, RESET_TIME);
  };

  const matchMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 6 && 11 > hours) {
      setCheerUpMessage(
        "좋은 아침이에요. 건강 유의하시고 행복 가득한 하루 보내세요.🐥"
      );
    } else if (hours >= 11 && 12 > hours) {
      setCheerUpMessage("곧 점심시간이에요! 조금만 더 파이팅!👊");
    } else if (hours >= 12 && 13 > hours) {
      setCheerUpMessage(
        "점심 맛있게 드세요! 혹시.. 아직도 키보드에 손이 올라가있나요? 😒"
      );
    } else if (hours >= 13 && 15 > hours) {
      setCheerUpMessage(
        "점심 맛있게 드셨나요? 점심 식사 이후에 식곤증 조심하세요! 오후 시간도 힘내세요. 파이팅!👊"
      );
    } else if (hours >= 15 && 17 > hours) {
      setCheerUpMessage("하루의 절반이 지나갔어요~ 남은 시간도 힘내세요!🐈");
    } else if (hours >= 17 && 18 > hours) {
      setCheerUpMessage(
        "퇴근시간이 다가왔어요..! 남은 일과를 마무리하면서 퇴근 준비 하세요~ 🐪"
      );
    } else if (hours >= 18 && 24 > hours) {
      setCheerUpMessage(
        "어, 이게 무슨 일이죠? 이 시간에 이 메세지를 보면 안되는데.. 내일을 위해 적당히 업무를 마치고 쉬세요!"
      );
    }
  };
}

export function useCheerUpMessage() {
  const [cheerUpMessage, setCheerUpMessage] =
    useRecoilState(cheerUpMessageState);

  return {
    cheerUpMessage,
    setCheerUpMessage,
  };
}
