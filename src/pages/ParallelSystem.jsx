import { useState } from "react";
import { Form } from "@/components/ui/form";
import PositionStep from "@/components/ParallelSystem/PositionStep";
import ConfigurationStep from "@/components/ParallelSystem/PositionStep/ConfigurationStep";
import useParallelForm from "@/hooks/useParallelForm";

export default function ParallelSystem() {
  const [majorStep, setMajorStep] = useState(0);
  const form = useParallelForm();
  const { control, handleSubmit } = form;

  const onSubmit = (values) => {
    // setMajorStep(prev => prev + 1);
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {majorStep === 0 && <PositionStep control={control} />}

          {majorStep === 1 && <ConfigurationStep />}
        </form>
      </Form>
    </main>
  );
}
