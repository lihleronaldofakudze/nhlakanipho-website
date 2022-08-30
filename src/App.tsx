import { Button, CircularProgress, Container, Typography } from "@mui/material";
import React, { useState } from "react";

import { fetchQuizQuestions, Difficulty, QuetionState } from "./API";

// components
import QuestionCard from "./components/QuestionCard";
import quiz from "./quiz.png";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 25;

const App = () => {
  // state
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuetionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // functions
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's Answer
      const answer = e.currentTarget.value;
      // Check answer against correct
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" fontWeight="bold">
        NHLAKANIPHO
        <img src={quiz} alt="Quiz" width={"50%"} />
      </Typography>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <Button
          variant="contained"
          color="success"
          className="start"
          onClick={startTrivia}
          sx={{ my: 2 }}
          fullWidth
        >
          Start
        </Button>
      ) : null}
      {!gameOver ? (
        <Typography
          variant="h5"
          color={score > TOTAL_QUESTIONS ? "success" : "error"}
          sx={{ my: 1 }}
        >
          Score: {score}
        </Typography>
      ) : null}
      {loading && <CircularProgress />}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {userAnswers.length === 0 || number - 1 === TOTAL_QUESTIONS ? null : (
        <Button
          variant="contained"
          color="warning"
          className="next"
          onClick={nextQuestion}
          fullWidth
          sx={{ mt: 3 }}
        >
          Next Question
        </Button>
      )}
    </Container>
  );
};

export default App;
