import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, AccountPromptModal, Button } from "../../common";
import { Redirect, useParams } from "react-router-dom";
import {
  EMPTY_CARD,
  PARENT_TYPE,
  MODAL_PAGE_TYPE,
  TEST_TEMPLATE_DATA,
} from "../../common/constants";
import * as Icon from "react-bootstrap-icons";

function CreateCard() {
  const { deckId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_CARD);
  const [templateData, setTemplateData] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/deckTemplate/${deckId}`)
      .then((response) => {
        setTemplateData(response.data);
      })
      .catch((err) => {
        console.log("!!", err);
        setTemplateData(TEST_TEMPLATE_DATA);
      });
  }, [deckId]);

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  const saveCard = (userId) => {
    axios
      .post(`http://localhost:8000/card`, {
        newCard: form,
        userId,
        deckId,
      })
      .then(() => {
        setShowModal(false);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onContinueAsGuest = () => {
    saveCard();
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      axios
        .post("http://localhost:8000/user", {
          name,
          username: email,
          password,
        })
        .then((res) => {
          saveCard(res.data.username);
        });
    } else {
      axios
        .post("http://localhost:8000/user/login", {
          userId: email,
          password,
        })
        .then((res) => {
          saveCard(res.data.userId);
        });
    }
  };

  const prompt = (
    <p>
      Help your {deckId} teammates get to know you by populating the template
      card with information about yourself!
    </p>
  );

  const btn = (
    <Button
      btnText="Save card to deck"
      onClick={() => {
        setShowModal(true);
      }}
      icon={<Icon.ArrowRight />}
    />
  );

  return (
    <>
      <CreateBody
        header="Create Your Card"
        prompt={prompt}
        btn={btn}
        cardEditorProps={{ templateData, form, setForm }}
      />
      <AccountPromptModal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        parentType={PARENT_TYPE.CARD}
        onCloseModal={() => setShowModal(false)}
        onContinueAsGuest={onContinueAsGuest}
        onSignupOrLogin={onSignupOrLogin}
      />
    </>
  );
}

export default CreateCard;
