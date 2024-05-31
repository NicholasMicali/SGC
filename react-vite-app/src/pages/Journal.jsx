import { useAuth } from "../auth/index";
import PromptList from "../components/journal/PromptList";

const JournalPage = () => {
  const { currentUser } = useAuth();

  const promptsArr = {
    vibesUp: {
      className: "bg-[#ffe9f2] border-[#fc086b]",
      buttonClassName: "text-[#fc086b]",
      title: "Vibes Up",
      titleClassName: "text-[#fc086b]",
    },
    upLift: {
      className: "bg-idle-blue border-[#1c9cd4]",
      buttonClassName: "text-[#1c9cd4]",
      title: "Up Lift",
      titleClassName: "text-[#1c9cd4]",
    },
    heartsOpen: {
      className: "bg-[#e0f0a4] border-[#92b024]",
      buttonClassName: "text-[#92b024]",
      title: "Hearts Open",
      titleClassName: "text-[#92b024]",
    },
  };

  return (
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        <div className="self-start text-[4rem] font-bold">Journal Prompt</div>
        <hr className="w-full border-t-2 border-idle-pink my-4" />

        <div className="flex w-full h-full justify-between">
          {currentUser && Object.keys(promptsArr).map((key, index) => {
            return (
              <PromptList
                key={key}
                className={promptsArr[key].className}
                buttonClassName={promptsArr[key].buttonClassName}
                title={promptsArr[key].title}
                titleClassName={promptsArr[key].titleClassName}
                staggerIndex={index}
              />
            );
          })}
        </div>
      </div>
  );
};

export default JournalPage;
