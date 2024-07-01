import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { cn } from "@/utils/cn";

export const InputField = ({
  control,
  name,
  className,
  type,
  labelText,
  labelClassName,
  containerClassname,
  suffixText,
  suffixClassname,
  description,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", containerClassname)}>
          <FormLabel className={labelClassName}>{labelText}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className={cn("pe-14", className)}
                type={type}
                value={field.value}
                onChange={field.onChange}
                {...field}
                {...props}
              />
              <span
                className={cn(
                  "absolute end-4 top-1/2 -translate-y-1/2 text-sm text-gray-600",
                  suffixClassname,
                )}
              >
                {suffixText}
              </span>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
