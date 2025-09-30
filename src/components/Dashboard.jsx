"use client"


import { Avatar, AvatarFallback } from "./ui/avatar";
import {motion} from "framer-motion";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { User, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Dashboard({ user }) {
  const firstName = user?.given_name ?? user?.name?.split(" ")[0] ?? "User";
  const initials = (
    user?.given_name?.[0] ??
    user?.name?.[0] ??
    "U"
  ).toUpperCase();

  return (
    <div className="min-h-screen pt-16 px-6 sm:px-10 bg-background text-foreground transition-colors">
      <header className="flex justify-between items-center mb-14">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Your AI Resume Dashboard
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted px-3 sm:px-4 py-2 rounded-2xl backdrop-blur-md shadow-md border border-border">
          <Avatar className="h-10 w-10 sm:h-11 sm:w-11 border border-border">
            <AvatarFallback className="bg-indigo-500 text-white font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="font-semibold">{user?.given_name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition">
            <CardHeader>
              <User className="h-8 w-8 mb-4 text-indigo-500 dark:text-indigo-400" />
              <CardTitle className="text-xl font-semibold">Profile</CardTitle>
              <CardDescription className="text-muted-foreground">
                Complete your profile to generate tailored documents.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/profile">
                <Button className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white">
                  Edit Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Generate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition">
            <CardHeader>
              <Sparkles className="h-8 w-8 mb-4 text-emerald-500 dark:text-emerald-400" />
              <CardTitle className="text-xl font-semibold">
                Generate Document
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Create AI-powered resumes or cover letters in seconds.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/generate">
                <Button className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white">
                  Start Generating
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-pink-500/20 transition">
            <CardHeader>
              <FileText className="h-8 w-8 mb-4 text-pink-500 dark:text-pink-400" />
              <CardTitle className="text-xl font-semibold">Documents</CardTitle>
              <CardDescription className="text-muted-foreground">
                View and download your saved resumes and cover letters.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/documents">
                <Button className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 text-white">
                  View Documents
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
