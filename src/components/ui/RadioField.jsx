import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/utils/cn";

export default function RadioField({
  control,
  name,
  containerClassname,
  labelText,
  labelClassname,
  radioItemClassname,
  checkIconClassname,
  radioLabelClassname,
  items = [],
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-3", containerClassname)}>
          <FormLabel className={labelClassname}>{labelText}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 gap-6"
            >
              {items.map(({ value, label, description, img }, index) => (
                <FormItem
                  className={cn(
                    `bg-gray-200 ${field.value === value ? "outline outline-2 outline-blue-800" : ""}`,
                    radioItemClassname,
                  )}
                  key={`${index}-${value}-${label}`}
                >
                  <FormControl>
                    <RadioGroupItem
                      value={value}
                      className={cn("hidden", checkIconClassname)}
                    />
                  </FormControl>
                  <FormLabel
                    className={cn(
                      "group relative cursor-pointer font-normal",
                      radioLabelClassname,
                    )}
                    title={description}
                  >
                    <div className="flex">
                      <figure className="w-3/12">
                        <img
                          src={img}
                          alt={label}
                          width={100}
                          height={100}
                          className="aspect-square w-full object-cover"
                        />
                      </figure>
                      <figcaption className="flex items-center ps-4 text-base">
                        {label}
                      </figcaption>
                    </div>
                    <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-blue-800/80" />
                    <div className="after:border-10 absolute -top-5 left-1/2 hidden min-w-44 -translate-x-1/2 -translate-y-full bg-black/85 p-4 leading-5 tracking-wider text-gray-50 group-hover:block">
                      {description}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-x-8 border-b-0 border-t-8 border-transparent border-t-black/85" />
                    </div>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
