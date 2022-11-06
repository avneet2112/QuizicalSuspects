import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SpaRounded } from "@mui/icons-material";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import axios from "axios";
import Router from "next/router";
import Loader from "../Loader";
import Swal from "sweetalert2";
import Timer from "../Timer";
export default function DisplayAnswer(props) {
  const { testD, user, setDisplayAnswer, setResult } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  // const [allChoices, setAllChoices] = React.useState([]);
  const [steps, setSteps] = React.useState(testD?.allQuestions);
  const [loading, setLoading] = React.useState(false);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const submitD = () => {
    setLoading(true);
    const arr = [...steps];
    const dataToSend = arr.map((res) => {
      return res;
    });
    axios
      .patch(`/api/question`, {
        data: { id: Router.query.id, data: dataToSend },
      })
      .then((res) => {
        setLoading(false);
        setDisplayAnswer(true);
        setResult(res.data);
      })
      .catch((err) => console.log("err"));
  };
  const handleSubmit = (d) => {
    if (d == "auto") {
      submitD();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Are you sure you want to submit the test?",
        showConfirmButton: true,
        confirmButtonText: "Submit",
        confirmButtonColor: "green",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "red",
      })
        .then((res) => {
          if (res.isConfirmed) {
            submitD();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleChoices = (value, step) => {
    const arr = [...steps];
    arr.forEach((element) => {
      if (element.questionId == step.questionId) {
        element.userAnswer = value;
      }
    });
    setSteps(arr);
  };
  React.useEffect(() => {
    setSteps(testD?.allQuestions);
  }, [testD?.allQuestions]);
  return (
    <>
      {user == "student" && <Timer handleSubmit={() => handleSubmit("auto")} />}
      <Box style={{ maxWidth: "600px" }} className="container">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
                onClick={() => {
                  setActiveStep(index);
                }}
              >
                <div
                  className={step?.userAnswer ? "text-success" : "text-black"}
                >
                  {" "}
                  Question {index + 1}
                </div>
              </StepLabel>
              <StepContent>
                <Typography variant="h4">{step.question}</Typography>
                <Box sx={{ m: 4 }}>
                  {step.answerOptions?.length > 0 ? (
                    <>
                      <RadioGroup
                        onChange={(v) => handleChoices(v, step)}
                        pointColor="#fff"
                        value={step?.userAnswer}
                      >
                        {step.answerOptions.map((res, index) => (
                          <RadioButton key={index} value={res}>
                            {res}
                          </RadioButton>
                        ))}
                      </RadioGroup>
                    </>
                  ) : (
                    <Typography>--No Options--</Typography>
                  )}
                </Box>
                {user == "admin" && (
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Correct Answer:</span>
                    <span style={{ color: "green" }}>
                      {step?.correctAnswer}
                    </span>
                  </Typography>
                )}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            {user == "admin" ? (
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
            ) : (
              <Typography>Do you want to submit the test?</Typography>
            )}
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
            {user == "student" && (
              <Button
                disable={loading}
                onClick={handleSubmit}
                sx={{ mt: 1, mr: 1 }}
              >
                Submit
              </Button>
            )}
            {loading && <Loader />}
          </Paper>
        )}
      </Box>
    </>
  );
}
