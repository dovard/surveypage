import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  qsLoading: false,
  color: null,
  id: null,
  qs: {
    questions: "",
    answer: [],
    qsList: [],
  },
};

export const getSurveyQs = createAsyncThunk(
  "dailyQuestions/fetchSurveyQs",
  async () => {
    const res = await axios.get("/api/send/surveyQuestion");
    console.log(res);
    return res.data.question;
  }
);

export const postSurveyQs = createAsyncThunk(
  "dailyQuestions/postQs",
  async (data) => {
    let target = 0;
    let result = {};
    const emotion = ["happy", "sad", "joy", "anger"];
    let num = 0;
    for (let i = 0; i < data.length; i++) {
      target = target + data[i].answer;
      if (i % 3 === 2) {
        result[emotion[num]] = target;
        target = 0;
        num++;
      }
    }
    try {
      const res = await axios.post("/api/data/addColor", result);
      return res.data;
    } catch (err) {
      return err.response;
    }
  }
);

export const DailyQsSlice = createSlice({
  name: "dailyQuestions",
  initialState,
  reducers: {
    addAnswer: (state, { payload }) => {
      console.log(payload);
      state.daily.answer.map((m) => console.log(m));
      const data = state.daily.answer.filter((m) => m.index !== payload.index);
      data.push(payload);
      state.daily.answer = data;
      // state.daily.qs.push(payload);
    },
    addTextAnswer: (state, { payload }) => {
      console.log(payload);
      state.daily.answer.map((m) => console.log(m));
      const data = state.qs.answer.filter((m) => m.index !== payload.index);
      data.push(payload);
      state.qs.answer = data;
      // state.daily.qs.push(payload);
    },
  },
  extraReducers: {
    [getSurveyQs.pending]: (state, { payload }) => {
      state.qsLoading = true;
    },
    [getSurveyQs.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.daily.qs = payload;
      state.qsLoading = false;
    },
    [getSurveyQs.rejected]: (state, { payload }) => {
      state.qsLoading = false;
    },
    [postSurveyQs.pending]: (state, action) => {
      state.qsLoading = true;
      console.log(action);
    },
    [postSurveyQs.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.qsLoading = false;
      state.color = payload.data.color;
    },
    [postSurveyQs.rejected]: (state, action) => {
      state.qsLoading = false;
      console.log(action);
    },
  },
});

export const { addAnswer } = DailyQsSlice.actions;

export default DailyQsSlice.reducer;
