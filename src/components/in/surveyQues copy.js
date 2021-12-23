import React, { useState } from "react";
import styled from "styled-components";
import { Data } from "../data.js";
import "./surveyQues.scss";
import { addAnswer, postSurveyQs, getSurveyQs } from "../../DailyQsReducer";
import { useSelector, useDispatch } from "react-redux";

const BarSpot = styled.div`
  width: ${(props) => `${props.idx * 8.33}%`};
  border: 4px solid black;
  color: rgb(63, 62, 62);
  transition: width 0.5s linear;
  border-radius: 1em; ;
`;

const Question = styled.div`
  display: flex;
  position: relative;
  height: 30vh;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  width: 1200%;
  height: 100%;
  display: flex;
  flex: 0 0 auto;
  transform: ${({ idx }) => `translateX(-${(idx - 1) * 8.33}%)`};
`;

const Slide = styled.div`
  width: 8.33%;
  margin: 0;
  align-content: center;
  text-align: center;
`;

export default function SurveyQues({ setToggle }) {
  const [idx, setIdx] = useState(1);
  const dispatch = useDispatch();
  const dailyQuestions = useSelector((state) => state.dailyQuestion.daily);
  // const [test, setTest] = useState(0);
  // const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="progressBar_content" idx={idx}>
        <div className="progressBarText">
          <h4>{idx}/12</h4>
        </div>
        <div className="bar">
          <div className="barAll">
            <BarSpot idx={idx}></BarSpot>
          </div>
        </div>
      </div>
      <Question>
        <SlideContainer idx={idx}>
          {dailyQuestions.qs.map((m, idx) => {
            return (
              <Slide key={idx} className="Slide">
                <h2>{m.qs}</h2>
              </Slide>
            );
          })}
        </SlideContainer>
        ;
      </Question>

      <div
        className="answerinner"
        key={dailyQuestions.label}
        style={{ position: "relative", top: "20%" }}
      >
        <button
          className="btn yesbtn"
          key={dailyQuestions.label}
          onClick={() => {
            dispatch(addAnswer({ index: key, answer: 1 }));
            if (idx === 12) {
              setToggle(true);
            } else {
              setIdx(idx + 1);
            }
          }}
        >
          yes
        </button>
        <button
          className="btn nobtn"
          onClick={() => {
            // dispatch(addAnswer({ index: m.label, answer: 0 }));
            if (idx === 12) {
              setToggle(true);
            } else {
              setIdx(idx + 1);
            }
          }}
        >
          no
        </button>
      </div>
    </>
  );
}
