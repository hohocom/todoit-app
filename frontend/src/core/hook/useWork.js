/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  workFormModalState,
  userState,
  workspaceDetailState,
} from "core/state";
import customAxios from "core/api";
import { addDays } from "date-fns";
import { dateObjectParser } from "utils/dateObjectParser";

export function useWork() {
  const user = useRecoilValue(userState);
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const [workFormModal, setWorkFormModal] = useRecoilState(workFormModalState);
  const [workDate, setWorkDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (user.id) {
      setWorkFormModal({
        ...workFormModal,
        workers: [].concat(user.id),
      });
    }
  }, [user.id]);

  const workFormInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "title") {
      setWorkFormModal({ ...workFormModal, title: value });
    } else if (name === "content") {
      setWorkFormModal({ ...workFormModal, content: value });
    }
  };

  //일정 저장
  const store = async () => {
    console.debug("%c[일정 저장중..]", "color: #EC7063");
    const formData = new FormData();
    formData.append("title", workFormModal.title);
    formData.append("content", workFormModal.content);
    formData.append("workspaceId", workspaceDetail.id);
    formData.append("themeColor", workFormModal.themeColor);
    workFormModal.workers.forEach((user) => {
      formData.append("users", user);
    });
    formData.append("startDate", dateObjectParser(workDate[0].startDate));
    formData.append("endDate", dateObjectParser(workDate[0].endDate));

    await customAxios({
      method: "post",
      url: "/works",
      data: formData,
    });
  };

  // 일정 폼 조건에 따라 닫기
  const workFormModalToggle = (result) => {
    console.debug(`%c[일정 모달창 상태 : ${result}`, "color: #EC7063");
    setWorkFormModal({
      ...workFormModal,
      isOpen: result,
    });
  };

  return {
    workFormModal,
    setWorkFormModal,
    workFormModalToggle,
    workFormInputChange,
    store,
    workDate,
    setWorkDate,
  };
}
