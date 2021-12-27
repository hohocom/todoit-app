/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

import {
  workFormModalState,
  userState,
  workspaceDetailState,
  workFormDateState,
  workDetailModalState,
} from "core/state";
import customAxios from "core/api";
import { dateObjectParser } from "utils/dateObjectParser";
import { addDays } from "date-fns";
import { useUser } from ".";

// 작업자 명단 세팅
export function useWorkInit() {
  const user = useRecoilValue(userState);
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const [workFormModal, setWorkFormModal] = useRecoilState(workFormModalState);

  useEffect(() => {
    if (user.id && workspaceDetail.users.length) {
      console.debug("%c[일정 작업자 설정중..]", "color:red");
      console.debug(workspaceDetail.users);
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
  }, [user.id, workspaceDetail.users.length]);
}

export function useWork() {
  const { user, levelUpCheck } = useUser();
  const [workspaceDetail, setWorkspaceDetail] =
    useRecoilState(workspaceDetailState);
  const [workFormModal, setWorkFormModal] = useRecoilState(workFormModalState);
  const [workFormDate, setWorkFormDate] = useRecoilState(workFormDateState);
  // const resetWorkFormModal = useResetRecoilState(workFormModalState);
  const resetWorkFormDate = useResetRecoilState(workFormDateState);

  const workFormInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "title") {
      setWorkFormModal({ ...workFormModal, title: value });
    } else if (name === "content") {
      setWorkFormModal({ ...workFormModal, content: value });
    }
  };

  // 일정 폼 조건에 따라 닫기
  const workFormModalOpen = () => {
    setWorkFormModal({
      ...workFormModal,
      isOpen: true,
    });
  };

  // 일정 작성 폼 닫기
  const workFormModalClose = () => {
    setWorkFormModal({
      ...workFormModal,
      id: "",
      title: "",
      content: "",
      isOpen: false,
    });
    resetWorkFormDate();
  };

  // 작업 인원 설정
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

  const setFormData = () => {
    const formData = new FormData();
    formData.append("title", workFormModal.title);
    formData.append("content", workFormModal.content);
    formData.append("workspaceId", workspaceDetail.id);
    formData.append("themeColor", workFormModal.themeColor);
    formData.append("startDate", dateObjectParser(workFormDate[0].startDate));
    formData.append(
      "endDate",
      dateObjectParser(addDays(workFormDate[0].endDate, 1))
    );
    workFormModal.workers.forEach((worker) => {
      if (worker.isChecked === true) {
        formData.append("users", worker.id);
      }
    });
    return formData;
  };

  //일정 저장
  const store = async () => {
    console.debug("%c[일정 저장중..]", "color: #EC7063");

    levelUpCheck();

    const formData = setFormData();
    const { works } = await customAxios({
      method: "post",
      url: "/works",
      data: formData,
    });

    setWorkspaceDetail({
      ...workspaceDetail,
      works: works,
    });
    workFormModalClose();
  };

  // 일정 수정
  const edit = async () => {
    console.debug("%c[일정 수정중..]", "color: #EC7063");
    const formData = setFormData();
    await customAxios({
      method: "put",
      url: `/works/${workFormModal.id}`,
      data: formData,
    });
    const editWorks = workspaceDetail.works.map((work) => {
      if (workFormModal.id === work.id) {
        return {
          ...work,
          title: workFormModal.title,
          content: workFormModal.content,
          start: dateObjectParser(workFormDate[0].startDate),
          end: dateObjectParser(addDays(workFormDate[0].endDate, 1)),
          color: workFormModal.themeColor,
        };
      }
      return work;
    });
    setWorkspaceDetail({
      ...workspaceDetail,
      works: editWorks,
    });
    workFormModalClose();
  };

  const editDate = async (obj) => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("startDate", obj.event.startStr);
    formData.append("endDate", obj.event.endStr);
    await customAxios({
      method: "put",
      url: `/works/${obj.event.id}/date`,
      data: formData,
    });
    const newWorks = workspaceDetail.works.map((work) => {
      console.debug(work.id);
      console.debug(obj.event.id);

      if (work.id === Number(obj.event.id)) {
        return {
          ...work,
          start: obj.event.startStr,
          end: obj.event.endStr,
        };
      } else {
        return work;
      }
    });
    setWorkspaceDetail({
      ...workspaceDetail,
      works: newWorks,
    });
  };

  const destory = async (workId) => {
    const result = window.confirm("일정을 삭제하시겠어요?");
    if (!result) return false;

    console.debug("%c[일정 삭제중..]", "color: #EC7063");
    const formData = new FormData();
    formData.append("userId", user.id);

    await customAxios({
      method: "delete",
      url: `/works/${workId}`,
      data: formData,
    });

    const deleteWorks = workspaceDetail.works.filter(
      (work) => work.id !== workId
    );

    setWorkspaceDetail({
      ...workspaceDetail,
      works: deleteWorks,
    });
  };

  const editFinished = async (workId, result) => {
    if (result === 1) {
      levelUpCheck();
    }
    console.debug("%c[일정 수정중..]", "color: #EC7063");
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("result", result);
    await customAxios({
      method: "put",
      url: `/works/${workId}/finished`,
      data: formData,
    });
    const editWorks = workspaceDetail.works.map((work) => {
      if (work.id === workId) {
        return {
          ...work,
          isFinished: result,
        };
      } else {
        return work;
      }
    });
    setWorkspaceDetail({
      ...workspaceDetail,
      works: editWorks,
    });
  };

  return {
    workFormModal,
    setWorkFormModal,
    workFormModalOpen,
    workFormInputChange,
    store,
    edit,
    editDate,
    editFinished,
    destory,
    workFormDate,
    setWorkFormDate,
    workerToggle,
    workFormModalClose,
  };
}

export function useWorkDetail() {
  const [workDetailModal, setWorkDetailModal] =
    useRecoilState(workDetailModalState);
  const resetWorkDetailModal = useResetRecoilState(workDetailModalState);
  const [workFormModal, setWorkFormModal] = useRecoilState(workFormModalState);
  const setWorkFormDate = useSetRecoilState(workFormDateState);

  const closeWorkDetailModal = () => {
    resetWorkDetailModal();
  };

  const changeEditModal = () => {
    setWorkFormDate([
      {
        startDate: new Date(workDetailModal.startDate),
        endDate: addDays(new Date(workDetailModal.endDate), -1),
        key: "selection",
      },
    ]);

    setWorkFormModal({
      ...workFormModal,
      isOpen: true,
      id: workDetailModal.id,
      title: workDetailModal.title,
      content: workDetailModal.content,
      // workers: newWorkers,
    });
    closeWorkDetailModal();
  };

  return {
    workDetailModal,
    setWorkDetailModal,
    closeWorkDetailModal,
    changeEditModal,
  };
}
