import { useAuth } from "../auth/index";
import PromptList from "../components/journal/PromptList";
import { useState } from "react";
import { AnimatePresence} from "framer-motion";
import ExpandedList from "../components/journal/ExpandedList";
const JournalPage = () => {
  const { currentUser } = useAuth();
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const promptsArr = {
    vibesUp: {
      className: "bg-[#ffe9f2] border-[#fc086b]",
      buttonClassName: "text-[#fc086b]",
      title: "Vibes Up",
      titleClassName: "text-[#fc086b]",
      prompts: [
        "Set a timer for 1 minute. For the entire minute continue to write what you love. Complete this sentence over and over in your journal: I love_____________________ Good tip: (For example, you may consider: What do you love to do? Who are people you love spending time with? Where do you love to go? What lights you up? What makes you happy?) If you’re having trouble coming up with things you love, place your hand over your heart. This will help you get out of your thinking brain and allow your heart to express itself.",
        "Draw a picture of you doing your favorite activity.",
      ],
    },
    upLift: {
      className: "bg-idle-blue border-[#1c9cd4]",
      buttonClassName: "text-[#1c9cd4]",
      title: "Up Lift",
      titleClassName: "text-[#1c9cd4]",
      prompts: [
        "Write down 3 things you love about yourself. After you have written them in your journal, place your hand on your heart, close your eyes, take a deep breath in through your nose, exhale out through your mouth as if blowing out birthday candles, open your eyes and read what you have just written to yourself. After each one, take another deep breath, exhale and allow yourself to acknowledge yourself for these unique qualities. Follow-up: Turn to your partner and share one of these qualities with them. Ask to listen to one of the things they love about themselves too. Take a moment to see that person on a deeper level.",
        "Close your eyes and imagine you had a magic wand. Name one way you would use that magic wand to change the world and make it a better place. Draw a picture in your journal that illustrates this world.",
      ],
    },
    heartsOpen: {
      className: "bg-[#e0f0a4] border-[#92b024]",
      buttonClassName: "text-[#92b024]",
      title: "Hearts Open",
      titleClassName: "text-[#92b024]",
      prompts: [
        "Close your eyes, take a deep breath, and recall a moment when someone did something for you that made your day better. When you have it in your mind, open your eyes and write about it in your journal. What did they do? How did it make you feel?",
        "Close your eyes, take a deep breath, and recall a time when you did something for someone that made their day better? When you have it in your mind, open your eyes and write about it in your journal. What did you do? Why? How did it make you feel? How do you think the person you helped made them feel?",
        "Set a time for 1 minute. For the entire minute, write down as many ways you can imagine to help brighten people’s days.",
      ],
    },
  };

  return (
    <div className="flex-grow flex flex-col items-center overflow-auto p-4">
      <div className="self-start text-[4rem] font-bold">Journal Prompt</div>
      <hr className="w-full border-t-2 border-idle-pink my-4" />

      <div className="flex w-full h-full justify-between">
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
