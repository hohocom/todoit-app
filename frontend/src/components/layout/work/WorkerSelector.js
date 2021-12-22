import { useWork } from "core/hook";
import { useState } from "react";

function WorkerSelector() {
  const { workFormModal, workerToggle } = useWork();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between w-full p-2 border cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>참석자 선택</span>
        {isOpen ? (
          <i className="fas fa-caret-up"></i>
        ) : (
          <i className="fas fa-caret-down"></i>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute w-full  bg-white shadow-xl
        max-h-[300px] overflow-y-scroll custom-scroll z-10 border"
        >
          {workFormModal.workers.map((worker) => {
            return (
              <div
                key={worker.id}
                className="flex items-center justify-between p-2 px-4 border-b"
              >
                <span>{worker.nickname}</span>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={worker.isChecked}
                  onChange={(e) => workerToggle(e, worker.id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WorkerSelector;
