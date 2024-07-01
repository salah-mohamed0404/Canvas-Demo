export default function SectionContainer({ children }) {
  return (
    <section className="flex w-full flex-col gap-4 border-b border-b-gray-300 pb-12 last-of-type:border-b-0">
      {children}
    </section>
  );
}
