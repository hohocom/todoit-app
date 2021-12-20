import { useState } from "react";
import { useImage } from "core/hook";
import Modal from "./Modal";
import cameraImg from "assets/images/camera.png";

function ImagePreview({ storeImage, initImage }) {
  const { readImgFile } = useImage();
  const [state, setState] = useState({
    open: false,
    base64Img: "",
    file: null,
  });

  const setOpen = () => {
    setState({ ...state, open: !state.open, base64Img: "", file: null });
  };

  const imageChange = (e) => {
    readImgFile(e, (base64Img, file) => {
      console.debug(base64Img);
      console.debug(file);
      setState({ ...state, base64Img: base64Img, file: file });
    });
  };

  return (
    <>
      <button className="p-1 text-xs" onClick={setOpen}>
        이미지 변경
      </button>
      <Modal
        state={{
          open: state.open,
          setOpen: setOpen,
        }}
      >
        <div className="w-full mt-2">
          <label htmlFor="file" className="w-full cursor-pointer">
            <div className="min-h-[100px] border-4 border-dashed border-gray-200 rounded-md mt-2 p-2 flex justify-center items-center">
              {state.base64Img ? (
                <img src={state.base64Img} alt="img" className="rounded-md" />
              ) : (
                <div className="flex items-center justify-center w-full">
                  <img src={cameraImg} alt="img" />
                  <p className="text-xl font-apple-bold">
                    사진을 변경해보세요!
                  </p>
                </div>
              )}
            </div>
            <input
              id="file"
              type="file"
              onChange={imageChange}
              className="hidden"
            />
          </label>
          <div className="p-1">
            * 이미지는 양식에 맞추어 썸네일 크기로 자동 변경됩니다.
          </div>
          {state.file ? (
            <button
              onClick={() => {
                storeImage(state.file);
                setOpen();
              }}
              className="w-full p-3 pt-3.5 bg-[#ffac5ef3] rounded-md mr-3 text-xl text-white font-apple-bold ring-2 ring-white hover:ring-red-200 mt-2"
            >
              이미지 등록
            </button>
          ) : (
            <div className="flex justify-end w-full mt-2">
              <button
                className="text-red-400"
                onClick={() => {
                  initImage();
                  setOpen();
                }}
              >
                기본 이미지로 초기화
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ImagePreview;
