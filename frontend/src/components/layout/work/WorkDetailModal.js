import { Modal } from "components/common";
import { userState, workDetailModalState } from "core/state";
import { useRecoilState, useRecoilValue } from "recoil";

function WorkDetailModal() {
  const user = useRecoilValue(userState);
  const [workDetailModal, setWorkDetailModal] =
    useRecoilState(workDetailModalState);
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
      <div className="flex items-start justify-between mt-6 mb-1 font-apple-bold">
        <div className="mb-2 text-xl">{workDetailModal.title}</div>
        {workDetailModal.workers.map((worker) => {
          if (worker.id === user.id) {
            return (
              <div className="min-w-[100px] flex justify-end">
                <i className="text-lg text-gray-600 cursor-pointer fas fa-pencil-alt"></i>
                <i className="ml-4 text-lg text-gray-600 cursor-pointer fas fa-trash-alt"></i>
              </div>
            );
          }
          return null;
        })}
      </div>

      <pre className="break-all whitespace-pre-wrap font-apple-light">{workDetailModal.content}</pre>

      <div className="flex flex-wrap items-center justify-start mt-4">
        {workDetailModal.workers.map((worker) => {
          return (
            <div
              key={worker.id}
              className="px-2 rounded-[4px] text-gray-600 mr-1 mb-1 text-sm"
              style={{ backgroundColor: workDetailModal.themeColor }}
            >
              #{worker.nickname}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default WorkDetailModal;
