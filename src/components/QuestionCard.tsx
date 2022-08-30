import { Button, Card, Typography } from "@mui/material";
import React from "react";

import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Card sx={{ bgcolor: "rgba(255, 255, 255,.95)", p: 1 }}>
      <Typography variant="body1" className="number">
        Question {questionNr} / {totalQuestions}
      </Typography>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer, index) => (
          <div key={index + answer}>
            <Button
              variant="contained"
              color={
                userAnswer?.answer === userAnswer?.correctAnswer
                  ? "primary"
                  : "error"
              }
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              fullWidth
              sx={{ my: 1 }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuestionCard;
