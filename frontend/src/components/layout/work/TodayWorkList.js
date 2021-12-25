import { CheckBox } from "components/common";
import { useUser, useWork } from "core/hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { workDetailModalState, workspaceDetailState } from "core/state";
import notFoundWork from "assets/images/notFoundWork.png";
import { useRef } from "react";

function TodayWorkList() {
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const { editFinished } = useWork();
  const { user, getUserDetailById } = useUser();
  const setWorkDetailModal = useSetRecoilState(workDetailModalState);
  const worksRef = useRef();

  const handleEventClick = (id) => {
    workspaceDetail.works.forEach((work) => {
      if (work.id === id) {
        console.debug("%c[일정 디테일 설정중..],", "color:red");
        console.debug(work);
        setWorkDetailModal({
          isOpen: true,
          id: work.id,
          title: work.title,
          content: work.content,
          themeColor: work.color,
          isFinished: work.isFinished,
          workers: work.users,
          startDate: work.start,
          endDate: work.end,
        });
      }
    });
  };

  return (
    <>
      <div className="mt-16 mb-2 text-base font-apple-bold">Today My Works</div>
      <div
        ref={worksRef}
        id="todayMyWorks"
        className="overflow-y-auto custom-scroll"
      >
        {workspaceDetail.works.map((work) => {
          const startTimestamp = new Date(work.start).getTime();
          const endTimestamp = new Date(work.end).getTime();
          const todayTimestamp = new Date().getTime();
          console.debug(startTimestamp >= todayTimestamp);
          console.debug(todayTimestamp <= endTimestamp);

          return work.users.map((u) => {
            const isTodayMyWork =
              u.id === user.id &&
              startTimestamp <= todayTimestamp &&
              todayTimestamp <= endTimestamp;

            if (isTodayMyWork) {
              return (
                <div className="flex justify-center" key={work.id}>
                  <div className="flex items-center justify-between w-64 p-4 mb-3 bg-gray-100 rounded-lg ">
                    <div
                      className="flex flex-col cursor-pointer"
                      onClick={() => handleEventClick(work.id)}
                    >
                      <p className="font-apple-bold max-h-[30px] overflow-hidden">
                        {work.title}
                      </p>
                      <p className="text-sm text-gray-500 font-apple-bold max-h-[30px] overflow-hidden">
                        {work.content}
                      </p>
                    </div>
                    <div className="min-w-[50px] flex justify-end">
                      <CheckBox
                        value={Number(work.isFinished)}
                        changeEvent={async () => {
                          await editFinished(
                            work.id,
                            Number(work.isFinished) === 0 ? 1 : 0
                          );
                          await getUserDetailById(user.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          });
        })}
      </div>
      {worksRef.current && worksRef.current.childNodes.length === 0 && (
        <div className="flex flex-col items-center">
          <img src={notFoundWork} alt="img" />
          <p>일정이 존재하지 않아요!</p>
        </div>
      )}
    </>
  );
}

export default TodayWorkList;
