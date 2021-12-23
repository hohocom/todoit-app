import { Modal } from "components/common";
import { userState } from "core/state";
import { useRecoilValue } from "recoil";
import workDetailImg from "assets/images/work_detail.svg";
import { useWork, useWorkDetail } from "core/hook";

function WorkDetailModal() {
  const user = useRecoilValue(userState);
  const { workDetailModal, closeWorkDetailModal, changeEditModal } =
    useWorkDetail();
  const { destory } = useWork();

  return (
    <Modal
      state={{
        open: workDetailModal.isOpen,
        close: closeWorkDetailModal,
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
                  onClick={changeEditModal}
                ></i>
                <i
                  className="ml-4 text-lg text-gray-600 cursor-pointer fas fa-trash-alt"
                  onClick={() => destory(workDetailModal.id)}
                ></i>
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
