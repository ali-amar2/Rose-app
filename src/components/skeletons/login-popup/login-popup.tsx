import LoginForm from "@/app/[locale]/(auth)/login/_components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPopup() {
  return (
    <Card className="w-[28.125rem] my-32 mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="p-0 rounded-lg ">
          <TabsList className="w-full grid grid-cols-2 ">
            <TabsTrigger
              value="login"
              className="w-full rounded-r-none border-r-none border-t border-b border-maroon-600 capitalize"
            >
              login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="w-full rounded-l-none border border-zinc-300 border-l-none bg-zinc-50 text-zinc-800 capitalize"
            >
              register
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pt-6">
          <TabsContent value="login" className="mt-0">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="mt-0">
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
