"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export default function GeneratePage() {
  const [docType, setDocType] = useState("resume");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    setGenerated(false);
  }, [jobTitle, company, description, docType]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          company,
          description,
          type: docType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setMessage(`${data.document.title} created!`);
      setGenerated(true);
    } catch (error) {
      setMessage(`${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 bg-gradient-to-r from-background via-background to-muted/30 text-foreground transition-colors">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
          Generate Document
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          Create AI-powered resumes or cover letters tailored to your career
          goals.
        </p>
      </header>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="bg-card/80 backdrop-blur-md border border-border rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-emerald-500">
                Generate with AI
              </Sparkles>
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Fill in a few details and let AI craft a professional document.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={docType === "resume" ? "default" : "outline"}
                className="flex-1 rounded-xl"
                onClick={() => setDocType("resume")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Resume
              </Button>
              <Button
                type="button"
                variant={docType === "cover_letter" ? "default" : "outline"}
                className="flex-1 rounded-xl"
                onClick={() => setDocType("cover_letter")}
              >
                ✉️ Cover Letter
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Company */}
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g. OpenAI"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Job Description / Notes</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Paste the job description or notes here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
            {generated ? (
              <Link href="/documents">
                <Button className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white px-6 py-2 shadow-md hover:opacity-90 transition">
                  View Documents
                </Button>
              </Link>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-6 py-2 shadow-md hover:opacity-90 transition"
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.form>
    </div>
  );
}
