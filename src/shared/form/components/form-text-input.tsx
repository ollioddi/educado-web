import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/components/shadcn/form";
import { Input } from "@/shared/components/shadcn/input";
import { cn } from "@/shared/lib/utils";

interface TextFieldProps<TFieldValues extends FieldValues> {
  readonly control: Control<TFieldValues>;
  readonly name: FieldPath<TFieldValues>;
  readonly labelTranslationKey: string;
  readonly placeholderTranslationKey?: string;
  readonly required?: boolean;
  readonly descriptionTranslationKey?: string;
  readonly type?: "text" | "email" | "password";
  readonly className?: string;
  readonly labelAction?: React.ReactNode;
}

export const TextField = <TFieldValues extends FieldValues>({
  control,
  name,
  labelTranslationKey,
  placeholderTranslationKey,
  required = false,
  descriptionTranslationKey,
  type = "text",
  className,
  labelAction,
}: TextFieldProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          <div className="flex items-center">
            <FormLabel required={required}>{t(labelTranslationKey)}</FormLabel>
            {labelAction}
          </div>
          <FormControl>
            <Input
              type={type}
              placeholder={
                placeholderTranslationKey
                  ? t(placeholderTranslationKey)
                  : undefined
              }
              value={field.value ?? ""}
              onChange={(e) => { field.onChange(e.target.value); }}
              onBlur={field.onBlur}
              name={field.name}
            />
          </FormControl>
          {descriptionTranslationKey && (
            <FormDescription>{t(descriptionTranslationKey)}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
