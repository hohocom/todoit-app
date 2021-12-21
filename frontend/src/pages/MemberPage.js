import {
  WorkspaceContainer,
  WorkspaceLeftSide,
  WorkspaceRightSide,
  WorkspaceMain,
  WorkspaceHeader,
  WorkspaceSection,
} from "components/layout/workspace";
import { useSecure, useSetWorkspaceDetail } from "core/hook";
import {  workspaceDetailState } from "core/state";
import img from "assets/images/bg.jpg";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import customAxios from "core/api";
function MemberPage() {
  const [workspaceDetail, setWorkspaceDetail] =useRecoilState(workspaceDetailState); // 워크스페이스 code 가져오기! 
  const [usersData , setUsersData] = useState([]) // 모든 user
  let userDataLength = 0;  //총 유저수 
  const pageLimit = 10; // 한화면에 보여줄 유저 수
  const totalPageNumber = userDataLength / pageLimit; // 총 페이지 수
  const currentPageNumber = 1; // 현재 페이지 수

  const getAllUserData = async () =>{
    const { users } = await customAxios({
      method: "GET",
      url: `users?workspaceId=1&workspaceCode=${workspaceDetail.code}`,
    });
    setUsersData(users)
    userDataLength = setUsersData.length  
  }
  const role = (num) => {
    const roleText = ["관리자","매니저","방문자"] // 1 관리자 2 매니저 3 방문자
    return roleText[num-1]
  }
  useEffect(()=>{
    getAllUserData()
  
  },[])
  useEffect(()=>{
    console.log(usersData)
  
  },[usersData])
 
  useSecure();
  useSetWorkspaceDetail();

 



  // useEffect(()=>{
  //   console.log(userData)
  // },[])
  
 

  return (
    <WorkspaceContainer>
      <WorkspaceLeftSide />
      <WorkspaceMain>
        <WorkspaceHeader />
        <WorkspaceSection>
          <div className="flex flex-col  w-full ">
            <div className=" w-full h-14 flex items-center border-b">
              <div className="flex  justify-between  w-full font-noto-regular">
                <div className="flex justify-center w-40 ">프로필</div>
                <div className="flex justify-center w-40  ">레벨</div>
                <div className="flex justify-center w-40 ">역할</div>
                <div className="flex justify-center w-40 ">가입날짜</div>
                <div className="flex justify-center w-40 "></div>
              </div>
            </div>
            {usersData.map((user) => {
              return (
                <div className=" w-full h-14 flex items-center border-b hover:bg-[#ffac5ef3]">
                  <div className="flex  justify-between  items-center w-full ">
                    <div className="flex items-center  w-40  pl-4 ">
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
                    <div className="flex justify-center w-40  "></div>
                    <div className="flex justify-center w-40 ">{role(user.role)}</div>
                    <div className="flex justify-center w-40 ">2021-12-21</div>
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
            <div className="flex w-full  h-10  items-center justify-center mt-1">
              <div className="mr-3">1</div>
              <div className="mr-3">2</div>
              <div className="mr-3">3</div>
            </div>
          </div>
        </WorkspaceSection>
      </WorkspaceMain>
      <WorkspaceRightSide />
    </WorkspaceContainer>
  );
}

export default MemberPage;
