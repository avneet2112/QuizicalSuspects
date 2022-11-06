import React from "react";
import { Steps } from "intro.js-react";

const Introduction = () => {
  const [stepsEnabled, setstepsEnabled] = React.useState(true);
  const [steps, setSteps] = React.useState([
    {
      element: ".subject",
      intro: "Choose the subject",
    },
    {
      element: ".begin",
      intro: "Begin Test",
    },
    {
      element: ".logout",
      intro: "Logout to terminate the session",
    },
  ]);
  const [initialStep, setinitialStep] = React.useState(0);
  const onExit = async (currentStep) => {
    if (currentStep == steps.length - 1) {
      var data = {
        showOnboard: false,
      };
      // const res = await dispatch(updateOnboard(data));
    }
  };
  return (
    <>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={(currentStep) => onExit(currentStep)}
      />
    </>
  );
};

export default Introduction;
