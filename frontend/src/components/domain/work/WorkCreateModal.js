import { useRef, useState ,useEffect} from "react";
import { addDays } from "date-fns";
import { workCreateModalState } from "states/work";
import { DateRange } from "react-date-range";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiScaffold } from "utils/apis";
import { workspaceDetailState } from "states/workspace";

import bgImg from "assets/images/bg.jpg";
import plus from "assets/images/plus.png";
import checkWhite from "assets/images/check-white.png";
import Modal from "components/shared/Modal";

import ko from "date-fns/locale/ko";
import SockJsClient from "react-stomp";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

function WorkCreateModal() {
  const websocket = useRef();

  const [workCreateModal, setWorkCreateModal] =
    useRecoilState(workCreateModalState);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  useEffect(() => {
    setDateState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: "selection",
      },
    ])
     
  }, [workCreateModal]);
  const dateString = (date) => {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dateReturn = year + "-" + month + "-" + day;
    return dateReturn;
  };

  const colors = [
    { view: "bg-gray-200", data: "#E6E6E6" },
    { view: "bg-pink-200", data: "#F6CEEC" },
    { view: "bg-red-200", data: "#F6CECE" },
    { view: "bg-yellow-200", data: "#F5DA81" },
    { view: "bg-yellow-300", data: "#F7BE81" },
    { view: "bg-green-200", data: "#A9F5D0" },
    { view: "bg-blue-200", data: "#CEE3F6" },
    { view: "bg-purple-200", data: "#D8CEF6" },
  ];
  const [colorNumber, setColorNumber] = useState(0);
  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    content: "",
    color: colors[0].data,
    joinMember: "",
    startTime: "",
    endTime: "",
  });
  const scheduleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "title") {
      setScheduleForm({ ...scheduleForm, title: value });
    } else if (name === "content") {
      setScheduleForm({ ...scheduleForm, content: value });
    }
  };

  const changeColor = (index) => {
    console.debug(workspaceDetail);
    setColorNumber(index);
    setScheduleForm({ ...scheduleForm, color: colors[index].data });
  };
  //일정 전송
  const submit = async () => {
    const formData = new FormData();
    formData.append("title", scheduleForm.title);
    formData.append("content", scheduleForm.content);
    formData.append("workspaceId", workspaceDetail.id);
    formData.append("startDate", dateString(dateState[0].startDate));
    formData.append("endDate", dateString(dateState[0].endDate));
    formData.append("themeColor", scheduleForm.color);
    const users = ["1", "2"];
    users.forEach((user) => {
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
        <p className="mb-2 text-xl font-apple-bold">일정을 입력하세요</p>
        <input
          type="text"
          name="title"
          className="w-full h-10 p-1 mb-2 border rounded-md"
          placeholder="일정"
          onChange={scheduleFormChange}
        />
        <textarea
          type="text"
          name="content"
          className="w-full h-24 p-1 overflow-y-scroll border rounded-md custom-scroll"
          placeholder="내용"
          onChange={scheduleFormChange}
        />
        <p className="mt-2 ml-1 text-[15px]">테마 색상</p>
        <div className="flex ">
          {colors.length > 0 &&
            colors.map((color, index) => {
              return (
                <div
                  className="relative"
                  key={index}
                  onClick={() => changeColor(index)}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 ml-1 rounded-full ${color.view} cursor-pointer`}
                  ></div>
                  {colorNumber === index && (
                    <div className="absolute top-0 z-10 flex items-center justify-center w-10 h-10 ml-1 rounded-full">
                      <img alt="" src={checkWhite} className="w-7 h-7" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <p className="mt-2 ml-1 text-[15px] ">참석자</p>
        <div className="flex">
          <img
            src={plus}
            alt="img"
            className="top-0 flex items-center justify-center w-10 h-10 p-2 ml-1 bg-gray-200 rounded-full cursor-pointer"
          />

          <img src={bgImg} alt="img" className="w-10 h-10 ml-1 rounded-full" />
          <img src={bgImg} alt="img" className="w-10 h-10 ml-1 rounded-full" />
          <img src={bgImg} alt="img" className="w-10 h-10 ml-1 rounded-full" />
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
