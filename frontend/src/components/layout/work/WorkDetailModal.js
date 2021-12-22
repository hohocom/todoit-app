import { Modal } from "components/common";
import { workDetailModalState } from "core/state";
import { useRecoilState } from "recoil";

function WorkDetailModal() {
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
      <div>
        {workDetailModal.workers.map((worker) => {
          return <div key={worker.id}>{worker.nickname}</div>;
        })}
      </div>
      <div>{workDetailModal.title}</div>
      <pre>{workDetailModal.content}</pre>
    </Modal>
  );
}

export default WorkDetailModal;
