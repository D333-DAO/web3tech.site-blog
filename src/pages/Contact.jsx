import React from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Twitter, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-3xl sm:text-4xl mb-4">Contact</h1>
          <p className="text-muted-foreground leading-relaxed">
            Have a question, topic suggestion, or collaboration idea? We'd love to hear from you.
          </p>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-sm mb-1">Email</h2>
            <a
              href="mailto:contact@web3tech.site"
              className="text-primary hover:underline text-sm"
            >
              contact@web3tech.site
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              Best for article feedback, partnership requests, or content corrections.
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6 mb-6">
          <h2 className="font-heading font-semibold text-sm mb-4">Find Us Online</h2>
          <div className="space-y-3">
            <a
              href="https://web3tech.site"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              The Web3 Tech Blog — web3tech.site
            </a>
            <a
              href="https://techderksinsights.blogspot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              TechDerks Insights — techderksinsights.blogspot.com
            </a>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          We read every message and aim to respond within 2–3 business days.
        </p>
      </motion.div>
    </div>
  );
}