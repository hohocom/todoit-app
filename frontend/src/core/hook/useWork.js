/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  workFormModalState,
  userState,
  workspaceDetailState,
  workFormDateState,
} from "core/state";
import customAxios from "core/api";
import { dateObjectParser } from "utils/dateObjectParser";

export function useWork() {
  const user = useRecoilValue(userState);
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const [workFormModal, setWorkFormModal] = useRecoilState(workFormModalState);
  const [workFormDate, setWorkFormDate] = useRecoilState(workFormDateState);

  useEffect(() => {
    if (user.id) {
      const workers = workspaceDetail.users.map((u) => {
        if (u.id === user.id) {
          return {
            id: u.id,
            nickname: u.nickname,
            isChecked: true,
          };
        } else {
          return {
            id: u.id,
            nickname: u.nickname,
            isChecked: false,
          };
        }
      });
      setWorkFormModal({
        ...workFormModal,
        workers: workers,
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
    formData.append("startDate", dateObjectParser(workFormDate[0].startDate));
    formData.append("endDate", dateObjectParser(workFormDate[0].endDate));

    workFormModal.workers.forEach((worker) => {
      if (worker.isChecked === true) {
        formData.append("users", worker.id);
      }
    });

    await customAxios({
      method: "post",
      url: "/works",
      data: formData,
    });

    workFormModalToggle(false);
  };

  // 일정 폼 조건에 따라 닫기
  const workFormModalToggle = (result) => {
    console.debug(`%c[일정 모달창 상태 : ${result}`, "color: #EC7063");
    setWorkFormModal({
      ...workFormModal,
      isOpen: result,
    });
  };

  const workerToggle = (e, workerId) => {
    const newWorkers = workFormModal.workers.map((worker) => {
      if (worker.id === workerId && workerId !== user.id)
        return {
          ...worker,
          isChecked: e.target.checked,
        };
      else return worker;
    });
    setWorkFormModal({
      ...workFormModal,
      workers: newWorkers,
    });
  };

  return {
    workFormModal,
    setWorkFormModal,
    workFormModalToggle,
    workFormInputChange,
    store,
    workFormDate,
    setWorkFormDate,
    workerToggle,
  };
}
