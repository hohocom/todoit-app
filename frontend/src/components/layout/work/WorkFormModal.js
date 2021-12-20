import { Modal } from "components/common";
import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import { useWork } from "core/hook";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { ThemeColorPicker, WorkFormContent, WorkFormTitle } from ".";

function WorkFormModal() {
  const {
    workFormModal,
    setWorkFormModal,
    workFormModalToggle,
    workFormInputChange,
    store,
    workDate,
    setWorkDate,
  } = useWork();

  return (
    <Modal
      state={{ open: workFormModal.isOpen, setOpen: workFormModalToggle }}
      options={{
        backgroundClose: true,
        closeButtonType: 1, // 1: arrow, 2: X
      }}
    >
      <div className="w-full mt-2">
        <p className="mb-2 text-xl font-apple-bold">
          일정을 작성해보세요. (●'◡'●)
        </p>
        <WorkFormTitle
          title={workFormModal.title}
          inputChange={workFormInputChange}
        />
        <WorkFormContent
          content={workFormModal.content}
          inputChange={workFormInputChange}
        />
        <p className="mt-2 ml-1 text-[15px]">테마 색상</p>
        <div className="flex">
          <ThemeColorPicker
            workFormModal={workFormModal}
            setWorkFormModal={setWorkFormModal}
          />
        </div>
        <p className="mt-2 ml-1 text-[15px] ">참석자</p>
        <div className="flex">
          <div className="relative">{/* 추후 개발 */}</div>
        </div>
        <DateRange
          className="flex items-center justify-center w-full"
          editableDateInputs={true}
          onChange={(item) => {
            console.debug(item.selection);
            setWorkDate([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={workDate}
          months={1}
          color="#ff935dad"
          direction="horizontal"
          locale={ko}
        />
        <div className="flex text-white font-apple-bold">
          <button
            className="w-full h-10  mt-2  rounded-md bg-[#ff925d]"
            onClick={store}
          >
            일정입력
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default WorkFormModal;
