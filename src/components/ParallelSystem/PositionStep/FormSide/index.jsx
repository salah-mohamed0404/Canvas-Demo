import { Button } from "@/components/ui/button";
import LocationSection from "./LocationSection";
import RequirementSection from "./RequirementSection";
import TerrainTypeSection from "./TerrainTypeSection";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function FormSide({ control }) {
  return (
    <aside className="flex w-1/2 flex-col items-start gap-10 overflow-auto bg-white px-20 py-20 last:!border-b-0">
      <button type="button" className="flex items-center gap-2 font-semibold">
        <ArrowLeftIcon /> Go back
      </button>

      <LocationSection control={control} />
      <TerrainTypeSection control={control} />
      <RequirementSection control={control} />

      <Button className="self-end" size="lg" type="submit">
        To the drawing tool
      </Button>
    </aside>
  );
}
