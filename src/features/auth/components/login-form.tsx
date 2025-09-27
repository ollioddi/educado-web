import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/shared/components/shadcn/button";
import { Form } from "@/shared/components/shadcn/form";
import { TextField } from "@/shared/form/components/form-text-input";
import { useAuth, type LoginParams } from "@/shared/hooks/use-auth";
import { cn } from "@/shared/lib/utils";

// Provide typed defaults. Keep this object stable across renders.
const defaultValues: LoginParams = { email: "", password: "" };

export const LoginForm = ({ className, ...props }: ComponentProps<"form">) => {
  const { t } = useTranslation();
  const { login } = useAuth();

  // Zod schema for validation
  const schema = useMemo(() => {
    return z.object({
      email: z.email({
        message: t("login.invalidEmail"),
      }),
      password: z.string().min(8, {
        message: t("login.passwordMinLength"),
      }),
    });
  }, [t]);

  const form = useForm<LoginParams>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (values: LoginParams) => {
      await login(values);
    },
    [login]
  );

  const handleForgotPassword = () => {
    toast.info("Forgot password functionality is not implemented yet.");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit(onSubmit)(e);
        }}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("login.title")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("login.subtitle")}
          </p>
        </div>

        {/* Fields */}
        <div className="grid gap-6">
          {/* Email */}
          <TextField
            control={form.control}
            name="email"
            labelTranslationKey="login.email"
            placeholderTranslationKey="login.emailPlaceholder"
            type="email"
            required
          />

          {/* Password */}
          <TextField
            control={form.control}
            name="password"
            labelTranslationKey="login.password"
            placeholderTranslationKey="login.passwordPlaceholder"
            required
            labelAction={
              <button
                type="button"
                onClick={handleForgotPassword}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                {t("login.forgotPassword")}
              </button>
            }
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? t("login.loadingLogin")
              : t("login.loginButton")}
          </Button>

          {/* Divider */}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              {t("login.orContinueWith")}
            </span>
          </div>

          {/* Social login (example) */}
          <Button variant="outline" className="w-full" type="button">
            {/* your icon */}
            {t("login.loginWithGitHub")}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm">
          {t("login.noAccount")}{" "}
          <button type="button" className="underline underline-offset-4">
            {t("login.signUp")}
          </button>
        </div>
      </form>
    </Form>
  );
};
