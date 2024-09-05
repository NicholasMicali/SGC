import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { Navigate } from "react-router-dom";
import { doFetchCardByCode, resetUnreadCount } from "../firebase/firestore.js";
import SearchBar from "../components/home/searchbar.jsx";
import AllCards from "../components/cardsPages/allCards.jsx";
import CardFeed from "../components/cardsPages/cardFeed.jsx";
import NewCard from "../components/cardsPages/newCard.jsx";
import Challenge from "../components/cardsPages/challenge.jsx";
import Recieve from "../components/cardsPages/recieve.jsx";
import Button from "../new componenets/Button.jsx";
import WalkthroughModal from "../components/home/walkthroughModal.jsx";
import { motion } from "framer-motion";
import { animateVerticalFadeIn } from "../constants/anim.js";
import Confetti from "react-confetti";
import CongratsCard from "../components/cardsPages/congratsCard.jsx";
import Notification from "../components/home/notification.jsx";
import { doFetchUserProfile } from "../firebase/firestore";
import YouTubeVideo from "../new componenets/feed/YoutubeVideo.jsx";
const HomePage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState("feed");
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCid, setCurrentCid] = useState(null);
  const [isFirstPost, setIsFirstPost] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(0);
  const [userData, setUserData] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [firstTimeWalkThru, setFirstTimeWalkThru] = useState(true);

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth <= 840
  );
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth <= 1050
  );
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const y =  isNarrowScreen ? 280  : isMediumScreen ? 300 : 340;

  const handleAllCardsClick = async () => {
    await resetUnreadCount(currentUser.uid);
    setSubPage("all");
  };

  setTimeout(() => {
    setConfettiPieces(0);
  }, 2000);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth <= 768);
      setIsMediumScreen(window.innerWidth <= 1050);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(currentUser.uid);
        setUserData(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
    console.log("user data: ", userData);
  }, [currentUser]);

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const user = await doSignOut();
    } catch (error) {
      // Handle errors here, such as displaying a message to the user
      console.error("Log out failed:", error);
      alert("Failed to log out: " + error.message);
      return;
    }
    //console.log("user logged out: " + user);
    setIsSigningOut(true);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const card = await doFetchCardByCode(searchTerm);
      if (card != null) {
        selectCard(card.data(), card.id);
      }
    } catch (error) {
      console.error("Card not Found", error);
      alert("Failed to find card: " + error.message);
      return;
    }
  };

  const returnToFeed = () => {
    setSubPage("feed");
  };

  const toNewCard = () => {
    setSubPage("new");
  };

  const toAllCards = () => {
    setSubPage("all");
  };

  const selectCard = (card, cid) => {
    setCurrentCard(card);
    setCurrentCid(cid);
    setSubPage("feed");
  };

  const selectCardToChallenge = (card, cid) => {
    setCurrentCard(card);
    setCurrentCid(cid);
    setSubPage("challenge");
  };

  const firstPost = () => {
    setIsFirstPost(true);
    setSubPage("recieve");
  };

  const handleWalkthroughClose = () => {
    setShowWalkthrough(false);
  };

  const handleWalkthroughOpen = () => {
    setShowWalkthrough(true);
  };

  const onClickChallengeButton = () => {
    setSubPage("challenge");
    setShowCongrats(false);
  };

  if (isSigningOut) {
    return <Navigate to={"/"} replace={true} />;
  }

  const renderContent = () => {
    return (
      <>
        <div className="fixed z-30 w-screen">
          <Confetti numberOfPieces={confettiPieces} />
        </div>
        {showWalkthrough && (
          <WalkthroughModal onClose={handleWalkthroughClose} />
        )}
        {showCongrats && (
          <CongratsCard
            onClickX={() => setShowCongrats(false)}
            onClickChallenge={onClickChallengeButton}
          />
        )}

        <div
          className={
            (isNarrowScreen
              ? "flex-grow flex flex-col items-center px-5 py-12 md:hidden"
              : "flex-grow flex flex-col items-center py-10 max-md:hidden") +
            (isMediumScreen ? " px-16" : " px-24") +
            (showWalkthrough ? " blur-sm" : "")
          }
        >
          {subPage === "feed" ? (
            <div className="w-full flex flex-col gap-10 h-full">
              <div className="w-full font-semibold text-bold-pink text-5xl max-md:text-3xl max-sm:text-2xl">
                Hi {isNarrowScreen ? <br /> : ""}{" "}
                <span className="font-bold">
                  {userData ? userData.firstName : ""}!
                </span>
              </div>

              {/* {firstTime ? ( */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: firstTime ? 0 : y }}
                className=" w-full flex justify-center items-center max-md:flex-col"
              >
                <p className=" mr-20 text-xl font-semibold">
                  Click the video to receive your mission:
                </p>
                <div className="border-4 border-bold-pink shadow-xl rounded-md">
                  <YouTubeVideo
                    videoId="dQw4w9WgXcQ"
                    isNarrowScreen={isNarrowScreen}
                    isMediumScreen={isMediumScreen}
                  />
                </div>
              </motion.div>
              {/* ) : null} */}
              <motion.div className="w-full"
              initial={{y: firstTime ? 0 : -y}}
              animate={{y: firstTime ? 0 : -y}}
              >
                <p className="w-full text-2xl font-semibold mb-10">
                  How will you spread goodness today?
                </p>

                {isNarrowScreen ? (
                  <div className="flex flex-col justify-center my-4 w-full">
                    <div className="flex flex-row justify-center gap-2 my-2 w-full">
                      <motion.div
                        className="relative"
                        {...animateVerticalFadeIn(0)}
                      >
                        <Button
                          buttonText={"Accept a challenge"}
                          onClick={() => setSubPage("receive")}
                          className={
                            "!w-44 h-16 bg-bold-blue hover:bg-bold-blue-hover text-white rounded-md !justify-start !items-end p-2"
                          }
                          buttonTextClassName="text-left w-3/4 leading-tight"
                        />

                        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                          <Notification user={currentUser} />
                        </div>
                      </motion.div>

                      <motion.div {...animateVerticalFadeIn(0.1)}>
                        <Button
                          buttonText={"Start a new challenge"}
                          onClick={() => setSubPage("new")}
                          className={
                            "!w-44 h-16 bg-bold-pink hover:bg-bold-pink-hover text-white rounded-md !justify-start !items-end p-2"
                          }
                          buttonTextClassName="text-left leading-tight"
                        />
                      </motion.div>
                    </div>
                    <div className="flex flex-row justify-center gap-2 my-2 w-full">
                      <motion.div {...animateVerticalFadeIn(0.2)}>
                        <Button
                          buttonText={"Nominate others"}
                          onClick={() => setSubPage("challenge")}
                          className={
                            "!w-44 h-16 bg-bold-yellow hover:bg-bold-yellow-hover text-white rounded-md !justify-start !items-end p-2"
                          }
                          buttonTextClassName="text-left w-3/4 leading-tight"
                        />
                      </motion.div>
                      <motion.div {...animateVerticalFadeIn(0.3)}>
                        <Button
                          buttonText={"See my posts"}
                          onClick={handleAllCardsClick}
                          className={
                            "!w-44 h-16 bg-bold-green hover:bg-bold-green-hover text-white rounded-md !justify-start !items-end p-2"
                          }
                        />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between gap-4 my-4 w-full">
                    <motion.div
                      className="w-full"
                      {...animateVerticalFadeIn(0)}
                    >
                      <Button
                        buttonText={"Accept a challenge"}
                        onClick={() => setSubPage("receive")}
                        className={
                          " max-w-[300px] h-20 bg-bold-blue hover:bg-bold-blue-hover text-white rounded-md !justify-start !items-end p-2"
                        }
                        buttonTextClassName="text-left w-1/2 leading-tight"
                      />
                    </motion.div>
                    <motion.div
                      className="w-full"
                      {...animateVerticalFadeIn(0.1)}
                    >
                      <Button
                        buttonText={"Start a new challenge"}
                        onClick={() => setSubPage("new")}
                        className={
                          "max-w-[300px] h-20 bg-bold-pink hover:bg-bold-pink-hover text-white rounded-md !justify-start !items-end p-2"
                        }
                        buttonTextClassName="text-left leading-tight w-1/2"
                      />
                    </motion.div>
                    <motion.div
                      className="w-full"
                      {...animateVerticalFadeIn(0.2)}
                    >
                      <Button
                        buttonText={"Nominate others"}
                        onClick={() => setSubPage("challenge")}
                        className={
                          " max-w-[300px] h-20 bg-bold-yellow hover:bg-bold-yellow-hover text-white rounded-md !justify-start !items-end p-2"
                        }
                        buttonTextClassName="text-left w-1/2 leading-tight"
                      />
                    </motion.div>
                    <motion.div
                      className="w-full"
                      {...animateVerticalFadeIn(0.3)}
                    >
                      <Button
                        buttonText={"See my posts"}
                        onClick={handleAllCardsClick}
                        className={
                          " max-w-[300px] h-20 bg-bold-green hover:bg-bold-green-hover text-white rounded-md !justify-start !items-end p-2"
                        }
                      />
                    </motion.div>
                  </div>
                )}
                <Button
                  buttonText="Negate firstTime"
                  onClick={() => setFirstTime(!firstTime)}
                />
                <CardFeed
                  user={currentUser}
                  card={currentCard}
                  setSubPage={setSubPage}
                  firstPost={firstPost}
                  isNarrowScreen={isNarrowScreen}
                  handleOpen={handleWalkthroughOpen}
                />
              </motion.div>
            </div>
          ) : (
            renderSubPage()
          )}
        </div>
      </>
    );
  };

  const renderSubPage = () => {
    return (
      <>
        {subPage === "all" && (
          <AllCards
            back={returnToFeed}
            user={currentUser}
            select={selectCard}
            isNarrowScreen={isNarrowScreen}
            newCard={toNewCard}
            currentCid={currentCid}
            setCurrentCard={setCurrentCard}
          />
        )}
        {subPage === "new" && (
          <NewCard
            back={returnToFeed}
            user={currentUser}
            setShowCongrats={setShowCongrats}
            setConfettiPieces={setConfettiPieces}
            select={selectCard}
            isNarrowScreen={isNarrowScreen}
            selectChallenge={selectCardToChallenge}
          />
        )}
        {subPage === "receive" && (
          <Recieve
            back={returnToFeed}
            user={currentUser}
            initCode={currentCid}
            first={isFirstPost}
            select={selectCard}
            isNarrowScreen={isNarrowScreen}
            selectChallenge={selectCardToChallenge}
            setShowCongrats={setShowCongrats}
            setConfettiPieces={setConfettiPieces}
          />
        )}
        {subPage === "challenge" && (
          <Challenge
            back={returnToFeed}
            user={currentUser}
            code={currentCard ? currentCard.code : null}
            cid={currentCid}
            cards={toAllCards}
          />
        )}
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default HomePage;
