import { useAuth } from "../auth/index";
import PromptList from "../components/journal/PromptList";
import { useState } from "react";
import { AnimatePresence} from "framer-motion";
import ExpandedList from "../components/journal/ExpandedList";
import { promptsArr } from "../constants/pageConstants";
import Logo from "../assets/logo.svg";


const JournalPage = () => {
  const { currentUser } = useAuth();
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  return (
    <div className="flex-grow flex flex-col items-center overflow-auto p-4">
      <img src={Logo} alt="Spread Goodness logo" className="p-4 z-0" /> 
      <div className="self-start text-[4rem] font-bold">Journal Prompt</div>
      <hr className="w-full border-t-2 border-idle-pink my-4" />

      <div className="flex max-md:flex-col w-full h-full justify-between">
        {currentUser &&
          Object.keys(promptsArr).map((key, index) => {
            return (
              <PromptList
                key={index}
                layoutId={key}
                className={promptsArr[key].className}
                buttonClassName={promptsArr[key].buttonClassName}
                title={promptsArr[key].title}
                titleClassName={promptsArr[key].titleClassName}
                staggerIndex={index}
                onClick={() => {
                  setSelectedPrompt(key);
                }}
                disabled={selectedPrompt}
              />
            );
          })}

        <AnimatePresence>
          {selectedPrompt && (
            <ExpandedList
              layoutId={selectedPrompt}
              onClick={() => {
                setSelectedPrompt(0);
                setTimeout(() => {
                  setSelectedPrompt(null);
                }, 550);
              }}
              divClassName={promptsArr[selectedPrompt].className}
              buttonClassName={promptsArr[selectedPrompt].buttonClassName}
              prompts={promptsArr[selectedPrompt].prompts}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JournalPage;
