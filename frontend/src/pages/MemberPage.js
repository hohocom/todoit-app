import {
  WorkspaceContainer,
  WorkspaceLeftSide,
  WorkspaceRightSide,
  WorkspaceMain,
  WorkspaceHeader,
  WorkspaceSection,
} from "components/layout/workspace";
import { useSecure, useSetWorkspaceDetail } from "core/hook";
import { workspaceDetailState } from "core/state";
import img from "assets/images/bg.jpg";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import customAxios from "core/api";
function MemberPage() {

  const [workspaceDetail, setWorkspaceDetail] =
    useRecoilState(workspaceDetailState); // 워크스페이스 code 가져오기!
  const [usersData, setUsersData] = useState([]); // 모든 user
  let userDataLength = 0; //총 유저수
  const [totalPageNumber, setTotalPageNumber] = useState(0); //총 페이지수

  const pageLimit = 10; // 한화면에 보여줄 유저 수
  const [currentPageNumber, setCurrentPageNumber] = useState(1); // 현재 페이지 수
  const getAllUserData = async () => {
    // 워크스페이스에 해당하는 유저 10명씩 불러오기
    const { users } = await customAxios({
      method: "GET",
      url: `users?workspaceCode=${workspaceDetail.code}&pageNumber=${currentPageNumber}`,
    });
    setUsersData(users);
    // 워크스페이스에 해당하는 모든 불러오기
    const totalUser = await customAxios({
      method: "GET",
      url: `users?workspaceCode=${workspaceDetail.code}`,
    });

    userDataLength = totalUser.users.length;
    setTotalPageNumber(Math.ceil(userDataLength / pageLimit));

    console.log(totalPageNumber);
  };
  //유저 역할
  const role = (num) => {
    const roleText = ["관리자", "매니저", "방문자"]; // 1 관리자 2 매니저 3 방문자
    return roleText[num - 1];
  };
  //페이지 교체
  const setPage = (num) => {
    console.log(num)
    setCurrentPageNumber(num)
  }
  useEffect(() => {
    getAllUserData();
  }, []);
  useEffect(() => {
    console.log('currentpagenumber 바뀜')
    getAllUserData();
  }, [currentPageNumber]);



  useSecure();
  useSetWorkspaceDetail();

  return (
    <WorkspaceContainer>
      <WorkspaceLeftSide />
      <WorkspaceMain>
        <WorkspaceHeader />
        <WorkspaceSection>
          <div className="flex flex-col  w-full ">
            <div className=" w-full h-14 flex items-center border-b">
              <div className="flex  justify-between  w-full font-noto-regular">
                <div className="flex justify-center w-44 ">프로필</div>
                <div className="flex justify-center w-36  ">레벨</div>
                <div className="flex justify-center w-40 ">역할</div>
                <div className="flex justify-center w-40 ">가입날짜</div>
                <div className="flex justify-center w-40 "></div>
              </div>
            </div>
            {usersData.map((user) => {
              return (
                <div
                  className=" w-full h-14 flex items-center border-b hover:bg-[#ffd3a994]   "
                  key={user.id}
                >
                  <div className="flex  justify-between  items-center w-full ">
                    <div className="flex items-center  w-44  pl-4 ">
                      <div className="relative">
                        <img
                          src={img}
                          className=" w-10 h-10 rounded-full mr-2"
                        />
                        <div className="absolute top-[28px] left-[28px]   ">
                          <div className=" w-3 h-3 rounded-full bg-white"></div>
                          <div className="absolute top-[1.5px] left-[1.5px] w-[8.8px] h-[8.8px] rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      <div>{user.nickname}</div>
                    </div>
                    <div className="flex justify-center w-36  ">
                      {user.level}
                    </div>
                    <div className="flex justify-center w-40 ">
                      {role(user.role)}
                    </div>
                    <div className="flex justify-center w-40 ">
                      {user.createdAt.substring(0, 10)}
                    </div>
                    <div className="flex justify-center w-40 ">
                      <button className="mr-4  rounded-md px-2 ">수정</button>
                      <button className=" rounded-md px-2 text-red-500">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex w-full  h-10  justify-center mt-1 items-baseline pt-2">
              {/* <div className="mr-3">&lt;</div> */}
              {Array.from(Array(totalPageNumber), (e, i) => {
                if(i+1===currentPageNumber){
                  return (
                  
                    <div className="mr-3 font-apple-bold cursor-pointer border-b border-black" key={i} onClick={()=>{setPage(i+1)}}>
                      {i + 1}
                    </div>
                  );
                }else{
                  return(
                    <div className="mr-3 font-apple-regular cursor-pointer hover:font-apple-bold " key={i} onClick={()=>{setPage(i+1)}}>
                      {i + 1}
                    </div>
                  );
                }
                
              })}
              {/* <div className="mr-3">&gt;</div> */}
            </div>
          </div>
        </WorkspaceSection>
      </WorkspaceMain>
      <WorkspaceRightSide />
    </WorkspaceContainer>
  );
}

export default MemberPage;
