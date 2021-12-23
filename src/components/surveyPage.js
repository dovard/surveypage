// import axios from "axios";
import React, { useState } from "react";
import SurveyQues from "./in/surveyQues";
import HereResult from "./in/hereResult";
import "./surveyPage.scss";

export default function Question1() {
  const [toggle, setToggle] = useState(false);
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
  //     console.log(response);
  //   });
  // }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#363636",
      }}
    >
      <div className="surveySp">
        <div>
          {/* <SurveyQues /> */}
          {toggle ? <HereResult /> : <SurveyQues setToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
}
