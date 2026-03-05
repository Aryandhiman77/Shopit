import { Divider, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect } from "react";
import ProgressBar from "../Elements/ProgressBar";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { PiWarning } from "react-icons/pi";
import { ErrorIcon } from "react-hot-toast";

const CustomStepper = ({ steps = [], activeStep = 0 }) => {
  const completedSteps = steps?.map((_, i) => {
    if (activeStep >= i) {
      return i;
    }
  });
  const currentActiveIndex = completedSteps[activeStep];

  return (
    <>
      <ul className="list-none w-full flex items-center">
        {steps?.map((step, i) => (
          <React.Fragment key={`product-progress-${i}`}>
            <li
              className={`p-1 text-[12px] rounded-md ${completedSteps.includes(i) ? (currentActiveIndex === i ? "border-2 border-blue-600 bg-blue-500! font-medium " : "bg-green-600") : "border-2 border-red-700  bg-red-600"}  text-white  w-39`}
            >
              <div className="flex items-center gap-2 justify-center select-none">
                {step.progress === 100 && <FaCheck />}
                {step.label}
              </div>
              {/* {i === 0 && (
                <div className="text-yellow-200">
                  <ErrorIcon className="mx-auto" size={23} />
                </div>
              )} */}
            </li>
            {steps.length - 1 !== i && (
              <>
                <ProgressBar
                  height={2}
                  value={step.progress}
                  progressBg={`${step.progress ? "bg-green-700" : "bg-red-700"}`}
                />
                <IoIosArrowForward
                  className={`${step.progress === 100 ? "text-green-700" : "text-gray-300"}`}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default CustomStepper;
