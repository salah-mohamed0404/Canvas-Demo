import PositionStep from "@/components/ParallelSystem/PositionStep";
import ConfigurationStep from "@/components/ParallelSystem/PositionStep/ConfigurationStep";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ParallelSystem() {
  const [majorStep, setMajorStep] = useState(0);
  const { register, getValues } = useForm();

  const handleNextMajorStep = () => {
    setMajorStep((prev) => prev + 1);
  };

  return (
    <main>
      <form>
        {majorStep === 0 && (
          <PositionStep
            register={register}
            getValues={getValues}
            onNextMajorStep={handleNextMajorStep}
          />
        )}

        {majorStep === 1 && <ConfigurationStep />}
      </form>
    </main>
  );
}
