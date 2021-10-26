import { useParams, NavLink } from "react-router-dom";
import { Button, DisplayCard } from "../common";
import "./DeckView.css";

function DeckView() {
  let { id } = useParams();
  console.log({ id });

  const title = "SWE";
  const subtitle = "Team for SWE Project, Fall 2021";

  const TempOne = {
    name: "Bob Ross",
    city: "NYC",
    tagline: "I love to paint, and laugh.",
    summary: "Designer (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Making happy mistakes",
    sectionContent1: "Nothing",
    sectionContent2: "bobross@happymistakes.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 80,
  };

  const TempTwo = {
    name: "Pikachu",
    city: "NYC",
    tagline: "Pika!!!!",
    summary: "Pokemon(# YOE), 10AM-11PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Pika Pika",
    sectionContent1: "Chu",
    sectionContent2: "pika@chu.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 20,
  };

  const TempThree = {
    name: "Ariana Grande",
    city: "NYC",
    tagline: "*whistle singing*",
    summary: "Singer and Artist (# YOE), 6AM-11PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Singing",
    sectionContent1: "Walking in sneakers",
    sectionContent2: "arianatalent@gmail.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 95,
  };

  const TempFour = {
    name: "Andrew Hamilton",
    city: "NYC",
    tagline: "Billionaire, President of NYU",
    summary: "Money-maker (# YOE), 24/7",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "I make money",
    sectionContent1: "I can't not make money",
    sectionContent2: "andyfanmail@gmail.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 50,
  };

  const TempFive = {
    name: "Jane Doe",
    city: "Unknown",
    tagline: "You don't know me",
    summary: "Missing (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "I can disappear",
    sectionContent1: "You'll never get to know me",
    sectionContent2: "?",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 10,
  };

  const allCards = [TempOne, TempTwo, TempThree, TempFour, TempFive];
  return (
    <div>
      <div className="header">
        <div className="title-container">
          <div className="title">{title}</div>
          {/* TODO: only show button for admin */}
          <Button btnText="Edit" linkTo={`${id}/edit`} />
        </div>
        <div className="subtitle">{subtitle}</div>
      </div>
      <div class="deck-list">
        {allCards.map((tempType) => (
          <DisplayCard tempArray={tempType}></DisplayCard>
        ))}
      </div>
      <div className="add-card">
        <NavLink to={`${id}/add`}>Add Card</NavLink>
      </div>
    </div>
  );
}
export default DeckView;
