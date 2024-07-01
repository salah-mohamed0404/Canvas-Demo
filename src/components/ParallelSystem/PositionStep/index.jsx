import FormSide from "./FormSide";

export default function PositionStep({ control }) {
  return (
    <div className="flex h-dvh gap-40 overflow-hidden">
      <FormSide control={control} />
      <div />
    </div>
  );
}
