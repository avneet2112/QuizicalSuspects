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
export default function DisplayAnswer(props) {
  const { testD, user } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState(testD?.allQuestions);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  React.useEffect(() => {
    setSteps(testD?.allQuestions);
  }, [testD?.allQuestions]);
  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              Question {index + 1}
            </StepLabel>
            <StepContent>
              <Typography variant="h3">{step.question}</Typography>
              <Box sx={{ m: 4 }}>
                {step.answerOptions?.length > 0 ? (
                  <>
                    <RadioGroup pointColor="#fff">
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
                  <span style={{ color: "green" }}>{step?.correctAnswer}</span>
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
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
