import type { Dispatch, SetStateAction } from "react";
import { useChatHistory } from "../contexts/ChatHistoryContext";

type AISideProps = {
  setWithQuestions: Dispatch<SetStateAction<boolean>>;
  withQuestions: boolean;
};

export default function AISide({ setWithQuestions }: AISideProps) {
  const toggle = () => setWithQuestions((v) => !v);
  const { getTodayHistory, getYesterdayHistory } = useChatHistory();

  const todayHistory = getTodayHistory();
  const yesterdayHistory = getYesterdayHistory();

  return (
    <div className="col-span-1 bg-white rounded-[0.8vw] text-center !pt-[7.4vh] !px-[3.56vw] ">
      <h2 className="text-[#BAB6B6] !text-[3.33vh] !mb-[4.5vh] !leading-[4.5vh] ">
        History
      </h2>

      {/* Today Section */}
      {todayHistory.length > 0 && (
        <div className="text-black !mb-[3vh]">
          <h4 className="text-[#BAB6B6] !text-[1vw] !font-normal h-[2.3vh] mb-[0.74vh]">
            Today
          </h4>
          {todayHistory.map((item) => (
            <p
              key={item.id}
              className="!mb-[0.324vh] cursor-pointer !text-[1vw] leading-[2.36vh]"
              onClick={toggle}
            >
              "{item.question}"
            </p>
          ))}
        </div>
      )}

      {/* Yesterday Section */}
      {yesterdayHistory.length > 0 ? (
        <div className="text-black !mb-[3vh]">
          <h4 className="text-[#BAB6B6] !text-[1vw] !font-normal h-[2.3vh] mb-[0.74vh]">
            Yesterday
          </h4>
          {yesterdayHistory.map((item) => (
            <p
              key={item.id}
              className="!mb-[0.324vh] cursor-pointer !text-[1vw] leading-[2.36vh]"
              onClick={toggle}
            >
              "{item.question}"
            </p>
          ))}
        </div>
      ) : (
        <div className="text-black !mb-[3vh]">
          <h4 className="text-[#BAB6B6] !text-[1vw] !font-normal h-[2.3vh] mb-[0.74vh]">
            Yesterday
          </h4>
          <p className="text-[#BAB6B6] !text-[0.9vw] italic">No conversations</p>
        </div>
      )}

      {/* Empty State if no history at all */}
      {todayHistory.length === 0 && yesterdayHistory.length === 0 && (
        <div className="text-[#BAB6B6] !text-[1vw] !mt-[3vh]">
          No conversation history yet
        </div>
      )}
    </div>
  );
}
