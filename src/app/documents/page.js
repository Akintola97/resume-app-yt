"use client";

import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export default function DoumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        setDocs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 bg-gradient-to-br from-background via-background to-muted/30">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
          Your Documents
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          Browse and view the resumes and cover letters you&#39;ve generated.
        </p>
      </header>
      {docs.length === 0 ? (
        <p className="text-muted-foreground text-center">
            No documents yet. Try generating one!
        </p>
      ): (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
            {docs?.map((doc, idx)=>(
                   <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
                <Link href={`/documents/${doc.id}`}>
                <Card className="group bg-card/80 backdrop-blur-md border border-border rounded-2xl shadow-md hover:shadow-xl hover:border-emerald-500/40 transition">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <FileText className="h-5 w-5 text-emerald-500" />
                        <span className="line-clamp-1">{doc.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {doc.type === "RESUME" ? "Resume" : "Cover Letter"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <span className="flex items-center gap-1 text-sm text-emerald-600 group-hover:translate-x-1 transition">
                        View <ArrowRight className="h-4 w-4" />
                    </span>
                </CardFooter>
                </Card>
                </Link>
                </motion.div>
                            ))}
        </motion.div>
      )}
    </div>
  );
}
