import { cn } from "@/utils/cn";

export default function SectionHeader({
  headerClassname,
  title,
  titleClassname,
  description,
  descriptionClassname,
}) {
  return (
    <header className={cn("flex flex-col gap-6", headerClassname)}>
      <h2 className={cn("text-2xl", titleClassname)}>{title}</h2>
      <p className={cn("text-gray-800", descriptionClassname)}>{description}</p>
    </header>
  );
}
