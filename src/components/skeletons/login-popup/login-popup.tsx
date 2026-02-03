"use client";
import LoginForm from "@/app/[locale]/(auth)/login/_components/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function LoginPopup() {
  // translation
  const t = useTranslations("login-popup");

  // router
  const router = useRouter();

  return (
    <Card className="w-[28.125rem] my-32 mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="p-0  ">
          <TabsList className="w-full grid grid-cols-2 ">
            <TabsTrigger value="login">{t("loginTab")}</TabsTrigger>

            {/* resirect to register path */}
            <TabsTrigger
              value="register"
              onPointerDown={() => router.push("/register")}
            >
              {t("registerTab")}
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pt-6">
          <TabsContent value="login" className="mt-0">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="mt-0"></TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
