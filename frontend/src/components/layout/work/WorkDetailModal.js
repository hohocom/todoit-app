import { Modal } from "components/common";
import { userState, workDetailModalState } from "core/state";
import { useRecoilState, useRecoilValue } from "recoil";
import workDetailImg from "assets/images/work_detail.svg";
import { useWork } from "core/hook";
import { addDays } from "date-fns";

function WorkDetailModal() {
  const user = useRecoilValue(userState);
  const [workDetailModal, setWorkDetailModal] =
    useRecoilState(workDetailModalState);
  const { workFormModal, setWorkFormModal, workFormDate, setWorkFormDate } =
    useWork();

  const closeModal = () => {
    setWorkDetailModal({
      ...workDetailModal,
      isOpen: false,
    });
  };

  return (
    <Modal
      state={{
        open: workDetailModal.isOpen,
        close: closeModal,
      }}
    >
      <div className="w-full mt-2">
        <img src={workDetailImg} alt="img" className="w-full" />
      </div>
      <div className="flex items-start justify-between mt-6 mb-1 font-apple-bold">
        <div className="mb-2 text-xl">{workDetailModal.title}</div>
        {workDetailModal.workers.map((worker) => {
          if (worker.id === user.id) {
            return (
              <div className="min-w-[100px] flex justify-end" key={worker.id}>
                <i
                  className="text-lg text-gray-600 cursor-pointer fas fa-pencil-alt"
                  onClick={() => {
                    setWorkFormModal({
                      ...workFormModal,
                      isOpen: true,
                      id: workDetailModal.id,
                      title: workDetailModal.title,
                      content: workDetailModal.content,
                      workers: workDetailModal.workers,
                    });
                    setWorkFormDate([
                      {
                        startDate: workDetailModal.startDate,
                        endDate: workDetailModal.endDate,
                        key: "selection",
                      },
                    ]);
                    closeModal();
                  }}
                ></i>
                <i className="ml-4 text-lg text-gray-600 cursor-pointer fas fa-trash-alt"></i>
              </div>
            );
          }
          return null;
        })}
      </div>

      <pre className="break-all whitespace-pre-wrap font-apple-light">
        {workDetailModal.content}
      </pre>

      <div className="flex flex-wrap items-center justify-start mt-4">
        {workDetailModal.workers.map((worker) => {
          return (
            <div
              key={worker.id}
              className="px-2 rounded-[4px] text-gray-600 mr-1 mb-1 text-sm bg-gray-200"
            >
              #{worker.nickname}
            </div>
          );
        })}
      </div>
      {/* <div className="relative w-full">
        <img
          src={scheduleCompletedImg}
          alt="img"
          className="absolute right-0 -bottom-20"
        />
      </div> */}
    </Modal>
  );
}

export default WorkDetailModal;
