/* eslint-disable react-hooks/exhaustive-deps */
import { cheerUpMessageState } from "core/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useCheerUpMessageInit() {
  const [cheerUpMessage, setCheerUpMessage] =
    useRecoilState(cheerUpMessageState);

  useEffect(() => {
    const timer = setMessageByMatchTimes();

    return () => {
      console.debug("타이머 종료");
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const notification = new Notification("투두잇", {
      body: cheerUpMessage,
      // icon: bgImg,
    });

    if (
      cheerUpMessageState !== null ||
      cheerUpMessageState !== "" ||
      cheerUpMessageState !== " "
    ) {
      setTimeout(notification.close.bind(notification), 5000);
    }
  }, [cheerUpMessage]);

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
      setCheerUpMessage("즐거운 아침이에요 :) 🐥");
    } else if (hours >= 11 && 12 > hours) {
      setCheerUpMessage("곧 점심시간이에요! 조금만 더 화이팅!! 👊");
    } else if (hours >= 12 && 13 > hours) {
      setCheerUpMessage(
        "점심 시간이에요~ 아직도 키보드에 손이 올라가있나요? 😒"
      );
    } else if (hours >= 13 && 15 > hours) {
      setCheerUpMessage(
        "이 시간만 되면 눈이 자꾸 감겨요. 🥱 다들 버틸 수 있을까요? ^.^"
      );
    } else if (hours >= 15 && 17 > hours) {
      setCheerUpMessage(
        "문도박사는 사실 박사가 아니에요. 본인이 박사라고 생각하는 것 뿐이랍니다. 😎"
      );
    } else if (hours >= 17 && 18 > hours) {
      setCheerUpMessage(
        "오늘도 고생하셨어요^^. 작업을 마무리하면서 퇴근 준비 하세요~"
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
