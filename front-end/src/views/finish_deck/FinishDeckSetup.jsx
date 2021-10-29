import { Redirect, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FORM_DEFAULT_PLACEHOLDERS,
  MODAL_PAGE_TYPE,
  PARENT_TYPE,
} from "../../common/constants";
import axios from "axios";
import { DeckEditor, AccountPromptModal, Button } from "../../common";
import * as Icon from "react-bootstrap-icons";
import "./FinishDeckSetup.css";

function FinishDeckSetup() {
  let data = useLocation();

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");

  if (redirectLink !== "") {
    return <Redirect to={redirectLink} />;
  }

  const saveDeck = (userId) => {
    let deckId;

    // user-entered template data would be contained in data.state.templateData
    // we want to fill in blanks with default vals
    const templateData = data?.state?.templateData;
    Object.keys(templateData).forEach((key) => {
      if (templateData[key] === "") {
        templateData[key] = FORM_DEFAULT_PLACEHOLDERS[key];
      }
    });

    // TODO: save deck data (updatedTemplate, name, desc)
    // link deck to userId if exists (and vice versa)

    const apiKey = process.env.REACT_APP_MOCKAROO_API_KEY;
    console.log(apiKey);

    axios
      .post(`http://localhost:8000/deck`, {
        userId,
        deckName,
        deckDescription,
        cardTemplate: templateData,
      })
      .then((res) => {
        deckId = res.data.deckId;
        setRedirectLink(`deck/${deckId}`);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);

        // while mockaroo is down...
        setRedirectLink(`deck/${123}`);
        setShowModal(false);
      });
  };

  const onContinueAsGuest = () => {
    saveDeck();
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    let userId;

    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      // TODO: create & save account – get id of newly created account
    } else {
      // TODO: log user in – get id of existing account
    }

    saveDeck(userId);
  };

  return (
    <div className="FinishDeckSetup">
      <h1>Finalize deck details</h1>
      <div className="mb-5">
        <DeckEditor
          deckName={deckName}
          setDeckName={setDeckName}
          deckDescription={deckDescription}
          setDeckDescription={setDeckDescription}
        />
      </div>
      <AccountPromptModal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        parentType={PARENT_TYPE.DECK}
        onContinueAsGuest={onContinueAsGuest}
        onSignupOrLogin={onSignupOrLogin}
      />
      <Button
        btnText="Create deck"
        onClick={() => {
          setShowModal(true);
        }}
        icon={<Icon.ArrowRight />}
      />
    </div>
  );
}

export default FinishDeckSetup;
