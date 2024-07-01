import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const formSchema = z.object({});

export default function useParallelForm() {
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      snowZone: 2.5,
      windZone: 23,
      terrainType: 0,
      dimensionalLifetime: "30",
      securityClass: "2",
    },
  });

  return form;
}
