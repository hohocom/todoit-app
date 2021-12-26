import { Modal } from "components/common";
import { userState } from "core/state";
import { useRecoilValue } from "recoil";

import { useWork, useWorkDetail } from "core/hook";
import { addDays } from "date-fns";
import { dateObjectParser } from "utils/dateObjectParser";

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
      {/* <div className="w-full mt-2">
        <img src={todayMyWorkImg} alt="img" className="w-full" />
      </div> */}
      <div className="flex items-start justify-between mt-6 font-apple-bold">
        <div className="text-xl">{workDetailModal.title}</div>
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
                  onClick={() => {
                    destory(workDetailModal.id);
                    closeWorkDetailModal();
                  }}
                ></i>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="font-apple-light">
        {workDetailModal.startDate ===
        dateObjectParser(addDays(new Date(workDetailModal.endDate), -1)) ? (
          workDetailModal.startDate
        ) : (
          <>
            {workDetailModal.startDate} ~{" "}
            {dateObjectParser(addDays(new Date(workDetailModal.endDate), -1))}
          </>
        )}
      </div>
      <pre className="mt-4 break-all whitespace-pre-wrap font-apple-light">
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
    </Modal>
  );
}

export default WorkDetailModal;
