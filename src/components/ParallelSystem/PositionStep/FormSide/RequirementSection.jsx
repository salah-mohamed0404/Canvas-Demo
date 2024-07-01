import SelectField from "@/components/ui/SelectField";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

export default function RequirementSection({ control }) {
  return (
    <SectionContainer>
      <SectionHeader
        title="Requirement"
        description="Choose how long the assembly should withstand the increasing climatic loads and specify the desired safety class on the assembly."
      />

      <div className="flex gap-4">
        <SelectField
          control={control}
          label="DIMENSIONAL LIFETIME"
          name="dimensionalLifetime"
          items={DIMENSIONAL_LIFETIME}
        />

        <SelectField
          control={control}
          label="SECURITY CLASS"
          name="securityClass"
          items={SECURITY_CLASS}
        />
      </div>
    </SectionContainer>
  );
}

const DIMENSIONAL_LIFETIME = [
  {
    label: "30 years",
    value: "30",
  },
  {
    label: "50 years",
    value: "50",
  },
];

const SECURITY_CLASS = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
];
