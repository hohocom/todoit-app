import { useRef, useState, useEffect } from "react";
import { addDays } from "date-fns";
import { workCreateModalState, workCreateModalUIState } from "states/work";
import { DateRange } from "react-date-range";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiScaffold } from "utils/apis";
import { workspaceDetailState } from "states/workspace";

import bgImg from "assets/images/bg.jpg";
import plus from "assets/images/plus.png";
import Modal from "components/shared/Modal";
import ThemeColorPicker from "./ThemeColorPicker";

import ko from "date-fns/locale/ko";
import SockJsClient from "react-stomp";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { userState } from "states/user";
import Avatar from "components/shared/Avatar";
import AvatarGroup from "components/shared/AvatarGroup";

function WorkCreateModal() {
  const websocket = useRef();

  const [workCreateModal, setWorkCreateModal] =
    useRecoilState(workCreateModalUIState);

  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setDateState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: "selection",
      },
    ]);
  }, [workCreateModal]);
  const dateString = (date) => {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dateReturn = year + "-" + month + "-" + day;
    return dateReturn;
  };

  const [workCreateForm, setWorkCreateForm] = useState({
    title: "",
    content: "",
    color: "#E5E7EB",
    users: [1],
    startTime: "",
    endTime: "",
  });

  const scheduleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "title") {
      setWorkCreateForm({ ...workCreateForm, title: value });
    } else if (name === "content") {
      setWorkCreateForm({ ...workCreateForm, content: value });
    }
  };

  //일정 전송
  const submit = async () => {
    const formData = new FormData();
    formData.append("title", workCreateForm.title);
    formData.append("content", workCreateForm.content);
    formData.append("workspaceId", workspaceDetail.id);
    formData.append("startDate", dateString(dateState[0].startDate));
    formData.append("endDate", dateString(dateState[0].endDate));
    formData.append("themeColor", workCreateForm.color);
    workCreateForm.users.forEach((user) => {
      formData.append("users", user);
    });

    await apiScaffold({
      method: "post",
      url: "/works",
      data: formData,
    });
    const data = {
      text: "hellow",
      tt: "gggg",
    };
    websocket.current.sendMessage("/sendTo", JSON.stringify(data));
    setWorkCreateModal(false);
  };

  return (
    <Modal
      state={{ open: workCreateModal, setOpen: setWorkCreateModal }}
      options={{
        backgroundClose: true,
        closeButtonType: 2, // 1: arrow, 2: X
      }}
    >
      <SockJsClient
        url={`${process.env.REACT_APP_API_URL}/start`}
        topics={["/topics/sendTo", "/topics/template", "/topics/api"]}
        onMessage={(msg) => {
          console.log(msg);
        }}
        ref={websocket}
      />
      <div className="">
        <p className="mb-2 text-xl font-apple-bold">
          일정을 작성해보세요. (●'◡'●)
        </p>
        <input
          type="text"
          name="title"
          className="w-full h-10 p-1 mb-2 border rounded-md 
          focus:ring-offset-[#ff925d] focus:ring-[#fc9765]
          focus:ring-1 focus:ring-offset-1 transition ease-in duration-200 outline-none"
          placeholder="일정"
          onChange={scheduleFormChange}
        />
        <textarea
          type="text"
          name="content"
          className="w-full h-24 p-1 overflow-y-scroll border rounded-md custom-scroll
          focus:ring-offset-[#ff925d] focus:ring-[#fc9765]
          focus:ring-1 focus:ring-offset-1 transition ease-in duration-200 outline-none"
          placeholder="내용"
          onChange={scheduleFormChange}
        />
        <p className="mt-2 ml-1 text-[15px]">테마 색상</p>
        <div className="flex">
          <ThemeColorPicker
            workCreateForm={workCreateForm}
            setWorkCreateForm={setWorkCreateForm}
          />
        </div>
        <p className="mt-2 ml-1 text-[15px] ">참석자</p>
        <div className="flex">
          <AvatarGroup items={[]} />
        </div>
        <DateRange
          className="flex items-center justify-center w-full"
          editableDateInputs={true}
          onChange={(item) => {
            setDateState([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateState}
          months={1}
          color="#ff935dad"
          direction="horizontal"
          locale={ko}
        />
        <div className="flex text-white font-apple-bold">
          <button
            className="w-full h-10  mt-2  rounded-md bg-[#ff925d]"
            onClick={submit}
          >
            일정입력
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default WorkCreateModal;
