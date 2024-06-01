import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { Navigate } from "react-router-dom";
import { doFetchCardByCode } from "../firebase/firestore.js";
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
import SmallProfile from "../components/home/smallProfile.jsx"
import WalkthroughModal from "../components/home/walkthroughModal.jsx";

const HomePage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState("feed");
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCid, setCurrentCid] = useState(null);
  const [isFirstPost, setIsFirstPost] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth <= 820
  );
  const [showWalkthrough, setShowWalkthrough] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth <= 820);
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

  if (isSigningOut) {
    return <Navigate to={"/"} replace={true} />;
  }
  const renderContent = () => {
    return (
    <>
      {showWalkthrough && <WalkthroughModal onClose={handleWalkthroughClose} />}
      <div
        className={
          (isNarrowScreen
            ? "flex-grow flex flex-col items-center overflow-auto px-5 py-10 md:hidden"
            : "flex-grow flex flex-col items-center overflow-auto px-24 py-10 max-md:hidden") + (showWalkthrough ? ' blur-sm' : '')}
      >
        {subPage === "feed" ? (
          <>
            {isNarrowScreen ? (
              <SmallSearchBar
                user={currentUser}
                signOut={signOut}
                page={subPage}
                onSearch={handleSearch}
              />
            ) : (
              <SearchBar onSearch={handleSearch} width="full" />
            )}
            {isNarrowScreen ? (
              <div className="flex flex-col justify-center my-4 w-full">
                <div className="flex flex-row justify-center gap-4 my-2 w-full">
                  <CardsButton
                    width="180px"
                    height="51.75px"
                    text="All cards"
                    borderColor="#BEDF3D"
                    textColor="#8DAB1C"
                    backgroundColor="#EAF4C0"
                    icon={AllCardIcon}
                    onClick={() => setSubPage("all")}
                  />
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
                </div>
                <div className="flex flex-row justify-center gap-4 my-2 w-full">
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
                  <CardsButton
                    width="180px"
                    height="51.75px"
                    text="Challenge"
                    borderColor="#FD3B8A"
                    textColor="#FC086B"
                    backgroundColor="#FFD3E5"
                    icon={ChallengeIcon}
                    onClick={() => setSubPage("challenge")}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between gap-4 my-4 w-full">
                <CardsButton
                  width="180px"
                  height="51.75px"
                  text="All cards"
                  borderColor="#BEDF3D"
                  textColor="#8DAB1C"
                  backgroundColor="#EAF4C0"
                  icon={AllCardIcon}
                  onClick={() => setSubPage("all")}
                />
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
                <CardsButton
                  width="180px"
                  height="51.75px"
                  text="Challenge"
                  borderColor="#FD3B8A"
                  textColor="#FC086B"
                  backgroundColor="#FFD3E5"
                  icon={ChallengeIcon}
                  onClick={() => setSubPage("challenge")}
                />
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
          />
        )}
        {subPage === "new" && (
          <NewCard
            back={returnToFeed}
            user={currentUser}
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
            selectChallenge={selectCardToChallenge}
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
