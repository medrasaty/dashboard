"use client";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { SignInSchema } from "@/features/auth/schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const params = useSearchParams();
  const error = params.get("error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    setIsSubmitting(true);
    try {
      await signIn("credentials", data);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form  {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("Login to your account")}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("Enter your email below to login to your account")}
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            {t("Invalid credentials")}
          </Alert>
        )}
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="m@example.com"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>{t("Password")}</FormLabel>
                  <a
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {t("Forgot your password?")}
                  </a>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t("Submitting...") : t("Login")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Login form skeleton
export function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-[50px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="ml-auto h-4 w-[120px]" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}