import { InputField } from "@/components/ui/InputField";
import SectionHeader from "./SectionHeader";
import SectionContainer from "./SectionContainer";

export default function LocationSection({ control }) {
  return (
    <SectionContainer>
      <SectionHeader
        title="Position"
        description="Enter position in the field below or on the map to retrieve climate loads."
      />

      <InputField
        control={control}
        name="address"
        labelText="Address"
        placeholder="Search your address..."
      />
      <div className="flex gap-4">
        <InputField
          control={control}
          name="snowZone"
          type="number"
          labelText="SNOW ZONE"
          suffixText="kN/m²"
        />
        <InputField
          control={control}
          name="windZone"
          type="number"
          labelText="WIND ZONE"
          suffixText="m/s"
          className="pe-10"
        />
      </div>
    </SectionContainer>
  );
}
