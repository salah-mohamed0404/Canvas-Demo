import RadioField from "@/components/ui/RadioField";
import SectionHeader from "./SectionHeader";
import SectionContainer from "./SectionContainer";

export default function TerrainTypeSection({ control }) {
  return (
    <SectionContainer>
      <SectionHeader
        title="Terrain type"
        description="Hover over the options to read more about each terrain type."
      />

      <RadioField
        control={control}
        name="terrainType"
        items={TERRAIN_TYPES}
        labelText="Terrain types"
      />
    </SectionContainer>
  );
}

const TERRAIN_TYPES = [
  {
    label: "Terrain type 0",
    value: 0,
    description: "Sea or coastal area exposed to open sea.",
    img: "/terrang/terrang1.jpg",
  },
  {
    label: "Terrain type I",
    value: 1,
    description:
      "Lake or flat and horizontal area with negligible vegetation and no obstructions.",
    img: "/terrang/terrang2.jpg",
  },
  {
    label: "Terrain type II",
    value: 2,
    description:
      "Area with low vegetation such as grass and occasional obstacles (trees, buildings) with a minimum mutual distance equal to 20 times the height of the obstacle.",
    img: "/terrang/terrang3.jpg",
  },
  {
    label: "Terrain type III",
    value: 3,
    description:
      "Area covered with vegetation or buildings or with single obstacles with the largest mutual distance equal to 20 times the height of the obstacle (for example villages, suburbs, forest land).",
    img: "/terrang/terrang4.jpg",
  },
  {
    label: "Terrain type IV",
    value: 4,
    description:
      "Area where at least 15% of the area is built-up and where the average height of the buildings is > 15 m.",
    img: "/terrang/terrang5.jpg",
  },
];
