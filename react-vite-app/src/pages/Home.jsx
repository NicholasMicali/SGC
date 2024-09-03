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
import CardsButton from "../components/cardsPages/cardsButton.jsx";
import AllCardIcon from "../assets/AllCardIcon.svg";
import NewCardIcon from "../assets/NewCardIcon.svg";
import ReceiveIcon from "../assets/ReceiveIcon.svg";
import ChallengeIcon from "../assets/ChallengeIcon.svg";
import SmallSearchBar from "../components/home/smallSearchBar.jsx";
import Logo from "../assets/logo.svg";
import WalkthroughModal from "../components/home/walkthroughModal.jsx";
import { motion } from "framer-motion";
import { animateVerticalFadeIn } from "../constants/anim.js";
import Confetti from "react-confetti";
import CongratsCard from "../components/cardsPages/congratsCard.jsx";
import Notification from "../components/home/notification.jsx";

const HomePage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState("feed");
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCid, setCurrentCid] = useState(null);
  const [isFirstPost, setIsFirstPost] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(0);

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth <= 840
  );
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth <= 1050
  );
  const [showWalkthrough, setShowWalkthrough] = useState(false);

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
            <>
              {isNarrowScreen ? (
                <>
                  <img
                    src={Logo}
                    alt="Spread Goodness logo"
                    className="p-4 z-0"
                  />
                  <SmallSearchBar
                    user={currentUser}
                    signOut={signOut}
                    page={subPage}
                    onSearch={handleSearch}
                  />
                </>
              ) : (
                <SearchBar onSearch={handleSearch} width="full" />
              )}
              {isMediumScreen ? (
                <div className="flex flex-col justify-center my-4 w-full">
                  <div className="flex flex-row justify-center gap-2 my-2 w-full">
                    <motion.div className="relative" {...animateVerticalFadeIn(0)}>
                      <CardsButton
                        width="180px"
                        height="51.75px"
                        text="All cards"
                        borderColor="#BEDF3D"
                        textColor="#8DAB1C"
                        backgroundColor="#EAF4C0"
                        icon={AllCardIcon}
                        onClick={handleAllCardsClick}
                      />
                      <div className = "absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                      <Notification
                        user={currentUser}
                      />
                      </div>
                    </motion.div>

                    <motion.div {...animateVerticalFadeIn(0.1)}>
                      <CardsButton
                        width="180px"
                        height="51.75px"
                        text="New Card"
                        borderColor="#48B8E6"
                        textColor="#1D9FD5"
                        backgroundColor="#D1EDF9"
                        icon={NewCardIcon}
                        onClick={() => setSubPage("new")}
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-row justify-center gap-2 my-2 w-full">
                    <motion.div {...animateVerticalFadeIn(0.2)}>
                      <CardsButton
                        width="180px"
                        height="51.75px"
                        text="Receive"
                        borderColor="#F2DD69"
                        textColor="#EDD134"
                        backgroundColor="#FCF7DA"
                        icon={ReceiveIcon}
                        onClick={() => setSubPage("receive")}
                      />
                    </motion.div>
                    <motion.div {...animateVerticalFadeIn(0.3)}>
                      <CardsButton
                        {...animateVerticalFadeIn(0.3)}
                        width="180px"
                        height="51.75px"
                        text="Challenge"
                        borderColor="#FD3B8A"
                        textColor="#FC086B"
                        backgroundColor="#FFD3E5"
                        icon={ChallengeIcon}
                        onClick={() => setSubPage("challenge")}
                      />
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between gap-4 my-4 w-full">
                  <motion.div {...animateVerticalFadeIn(0)}>
                    <CardsButton
                      width="180px"
                      height="51.75px"
                      text="All cards"
                      borderColor="#BEDF3D"
                      textColor="#8DAB1C"
                      backgroundColor="#EAF4C0"
                      icon={AllCardIcon}
                      onClick={handleAllCardsClick}
                    />
                  </motion.div>
                  <motion.div {...animateVerticalFadeIn(0.1)}>
                    <CardsButton
                      {...animateVerticalFadeIn(0.1)}
                      width="180px"
                      height="51.75px"
                      text="New Card"
                      borderColor="#48B8E6"
                      textColor="#1D9FD5"
                      backgroundColor="#D1EDF9"
                      icon={NewCardIcon}
                      onClick={() => setSubPage("new")}
                    />
                  </motion.div>
                  <motion.div {...animateVerticalFadeIn(0.2)}>
                    <CardsButton
                      {...animateVerticalFadeIn(0.2)}
                      width="180px"
                      height="51.75px"
                      text="Receive"
                      borderColor="#F2DD69"
                      textColor="#EDD134"
                      backgroundColor="#FCF7DA"
                      icon={ReceiveIcon}
                      onClick={() => setSubPage("receive")}
                    />
                  </motion.div>
                  <motion.div {...animateVerticalFadeIn(0.3)}>
                    <CardsButton
                      {...animateVerticalFadeIn(0.3)}
                      width="180px"
                      height="51.75px"
                      text="Challenge"
                      borderColor="#FD3B8A"
                      textColor="#FC086B"
                      backgroundColor="#FFD3E5"
                      icon={ChallengeIcon}
                      onClick={() => setSubPage("challenge")}
                    />
                  </motion.div>
                </div>
              )}
              <CardFeed
                user={currentUser}
                card={currentCard}
                setSubPage={setSubPage}
                firstPost={firstPost}
                isNarrowScreen={isNarrowScreen}
                handleOpen={handleWalkthroughOpen}
              />
            </>
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
