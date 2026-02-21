import { Divider, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const CustomStepper = ({ steps = [], activeStep = 1 }) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<Divider className="bg-blue-600! top-3 relative right-28" />}
    >
      {steps?.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
