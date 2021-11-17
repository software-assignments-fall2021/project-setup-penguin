import "./AccountPage.css";
import DisplayCard from "../../common/DisplayCard";
import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { TEST_CARDS_ARRAY } from "../../common/constants";
import axios from "axios";
import { useEffect } from "react";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import { Redirect } from "react-router-dom";

function AccountPage({ token }) {
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);

  //make states an object and the page-displayed state variable a string (with its values as the keys of the states object) for clarity later
  const states = ["Active", "inactive"]; //array for defining classes of button states

  //let { id } = useParams();
  let { id } = useParams();
  let pageContent;
  let pageElement;
  const [deckActive, setDeckActive] = useState(0);
  //0 = mydeck view, 1 = joinedcard view (for easy class switching for styling and content display using states array)

  const [ownedDeckNamesArray, setOwnedDeckNameData] = useState([]);
  const [ownedDeckIdsArray, setOwnedDeckIdData] = useState([]);
  const [ownedCardsArray, setOwnedCardsData] = useState([]); //user cards in owned decks
  const [joinedDeckNamesArray, setJoinedDeckNameData] = useState([]);
  const [joinedDeckIdsArray, setJoinedDeckIdData] = useState([]);
  const [joinedCardsArray, setJoinedCardsData] = useState([]); //user cards in joined decks
  const [ownedTemplateArray, setOwnedTemplateData] = useState([]);
  const [joinedTemplateArray, setJoinedTemplateData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((response) => {
        setIsDeckLoaded(true);
        let userCards = response.data;

        //creating arrays to make html elements
        let ownedTitles = [];
        let ownedTemplates = [];
        let ownedCards = [];
        let ownedIds = [];
        let joinedCards = [];
        let joinedTemplates = [];
        let joinedTitles = [];
        let joinedIds = [];

        //separates owned content from joined content
        for (const id in userCards) {
          if (userCards[id].isOwned) {
            ownedTitles.push(userCards[id].deckName);
            ownedCards.push(userCards[id].cardData);
            ownedIds.push(userCards[id].cardData.deckId);
            ownedTemplates.push(userCards[id].cardTemplate);
          } else {
            joinedTitles.push(userCards[id].deckName);
            joinedCards.push(userCards[id].cardData);
            joinedIds.push(userCards[id].cardData.deckId);
            joinedTemplates.push(userCards[id].cardTemplate);
          }
        }

        setOwnedDeckNameData(ownedTitles);
        setOwnedDeckIdData(ownedIds);
        setOwnedCardsData(ownedCards);
        setJoinedDeckNameData(joinedTitles);
        setJoinedDeckIdData(joinedIds);
        setJoinedCardsData(joinedCards);
        setOwnedTemplateData(ownedTemplates);
        setJoinedTemplateData(joinedTemplates);
      })
      .catch((err) => {
        console.log("!!", err);
        setIsDeckLoaded(true);
      });
    //Cleanup function to avoid warning/errors.
    return () => {
      setIsDeckLoaded(false);
      setOwnedDeckNameData();
      setOwnedDeckIdData();
      setOwnedCardsData();
      setJoinedDeckNameData();
      setJoinedDeckIdData();
      setJoinedCardsData();
    };
  }, []);

  //onClick functions for changing state for display
  const activateMyDeckView = () => {
    setDeckActive(0);
  };

  const activateJoinedDeckView = () => {
    setDeckActive(1);
  };

  //defines page content (either joined or owned)

  const ownedContent = [];
  const joinedContent = [];

  for (let i = 0; i < ownedDeckNamesArray.length; i++) {
    pageElement = (
      <div key={i}>
        <div className="deck">
          <div className="title">
            <NavLink to={`deck/${ownedDeckIdsArray[i]}`} className="deckLink">
              {ownedDeckNamesArray[i]}
            </NavLink>
          </div>
          <DisplayCard
            card={ownedCardsArray[i]}
            template={ownedTemplateArray[i]}
          ></DisplayCard>
        </div>
      </div>
    );
    ownedContent.push(pageElement);
  }

  for (let i = 0; i < joinedDeckNamesArray.length; i++) {
    pageElement = (
      <div key={i}>
        <div className="deck">
          <div className="title">
            <NavLink to={`deck/${joinedDeckIdsArray[i]}`} className="deckLink">
              {joinedDeckNamesArray[i]}
            </NavLink>
          </div>
          <DisplayCard
            card={joinedCardsArray[i]}
            template={joinedTemplateArray[i]}
          ></DisplayCard>
        </div>
      </div>
    );
    joinedContent.push(pageElement);
  }

  if (deckActive === 0) {
    pageContent = ownedContent;
  } else {
    pageContent = joinedContent;
  }

  const page = !isDeckLoaded ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="toggle-switch">
        <button
          className={states[deckActive]}
          id="myDeckView"
          onClick={activateMyDeckView}
          type="button"
        >
          Owned Decks
        </button>
        <button
          className={states[1 - deckActive]}
          id="joinedDeckView"
          onClick={activateJoinedDeckView}
          type="button"
        >
          Joined Decks
        </button>
      </div>
      <div className="deck-list">{pageContent}</div>
    </div>
  );

  return !token ? <Redirect to="/login" /> : page;
}

export default AccountPage;
