import { ShieldAlert, Link as LinkIcon, MessageSquare, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Chatbot } from "@/components/chat/Chatbot";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-white">Security Dashboard</h1>
          <p className="text-muted-foreground">Select an analysis tool or chat with the AI assistant.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/analyze">
              <Card className="glass-dark border-white/5 hover:border-primary/50 transition-colors cursor-pointer group h-full">
                <CardHeader>
                  <MessageSquare className="w-10 h-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Analyze Message</CardTitle>
                  <CardDescription className="text-muted-foreground/80">Paste emails or texts to check for phishing.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/analyze">
              <Card className="glass-dark border-white/5 hover:border-accent/50 transition-colors cursor-pointer group h-full">
                <CardHeader>
                  <LinkIcon className="w-10 h-10 mb-4 text-accent group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Scan URL</CardTitle>
                  <CardDescription className="text-muted-foreground/80">Verify if a website link is safe or malicious.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Card className="glass-dark border-white/5 hover:border-destructive/50 transition-colors cursor-pointer group h-full">
              <CardHeader>
                <ShieldAlert className="w-10 h-10 mb-4 text-destructive group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl text-white">Voice Scam</CardTitle>
                <CardDescription className="text-muted-foreground/80">Coming soon: Voice and deepfake detection.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="glass-dark border-white/5 hover:border-phish-success-mint/50 transition-colors cursor-pointer group h-full">
              <CardHeader>
                <Lightbulb className="w-10 h-10 mb-4 text-phish-success-mint group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl text-white">Cyber Tips</CardTitle>
                <CardDescription className="text-muted-foreground/80">Learn how to stay protected online.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Chatbot Section */}
          <div className="lg:col-span-1">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
