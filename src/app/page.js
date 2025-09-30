import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background transition-colors">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400/30 dark:bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="relative z-10 text-center px-6 space-y-6 max-w-2xl">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-muted border border-border shadow-lg">
            <Sparkles className="h-8 w-8 text-emerald 500 dark:text-emerald-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-500 via-emerald-500 to-pink-500 dark:from-indigo-400 dark:via-emerald-400 dark:to-pink-400 bg-clip-text text-transparent">
            Build Resumes That Stand Out
          </span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          Generate professional, ATS-friendly resumes and cover letters with AI.
          Save time. Get hired faster.
        </p>
        <LoginLink className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 text-lg">
          Sign in
        </LoginLink>
      </div>
    </main>
  );
}
