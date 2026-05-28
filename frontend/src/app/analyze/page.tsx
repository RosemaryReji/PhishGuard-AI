"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, ShieldAlert, ShieldCheck, Shield, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function AnalyzePage() {
  const { getToken } = useAuth();
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{risk_level: string, explanation: string} | null>(null);

  const handleAnalyze = async (type: "text" | "url") => {
    const content = type === "text" ? text : url;
    if (!content.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const endpoint = type === "text" ? "/analyze/text" : "/analyze/url";
      const body = type === "text" ? { text: content } : { url: content };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ risk_level: "Medium", explanation: "Error communicating with AI service." });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Critical": return "text-destructive shadow-destructive/50 border-destructive";
      case "High": return "text-phish-threat-orange shadow-phish-threat-orange/50 border-phish-threat-orange";
      case "Medium": return "text-yellow-400 shadow-yellow-400/50 border-yellow-400";
      case "Low": return "text-phish-success-mint shadow-phish-success-mint/50 border-phish-success-mint";
      default: return "text-primary shadow-primary/50 border-primary";
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12 relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-white">Threat Analysis</h1>
          <p className="text-muted-foreground">Scan messages or URLs using advanced AI to detect scams.</p>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/40">
            <TabsTrigger value="text" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Text Message</TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">Website URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-4">
            <Card className="glass-dark border-white/10">
              <CardContent className="p-6 space-y-4">
                <Textarea 
                  placeholder="Paste suspicious email or text message here..." 
                  className="min-h-[150px] bg-black/20 border-white/10 text-white focus-visible:ring-primary"
                  value={text}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                />
                <Button 
                  onClick={() => handleAnalyze("text")} 
                  disabled={isLoading || !text}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
                  Analyze Message
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="url" className="mt-4">
            <Card className="glass-dark border-white/10">
              <CardContent className="p-6 space-y-4">
                <Input 
                  placeholder="https://suspicious-website.com" 
                  className="bg-black/20 border-white/10 text-white focus-visible:ring-accent"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button 
                  onClick={() => handleAnalyze("url")} 
                  disabled={isLoading || !url}
                  className="w-full bg-accent hover:bg-accent/90 text-white shadow-[0_0_15px_rgba(0,85,255,0.4)]"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <LinkIcon className="w-4 h-4 mr-2" />}
                  Scan URL
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Risk Meter Visuals */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={`glass border-2 shadow-[0_0_30px_rgba(0,0,0,0)] transition-all duration-700 ${getRiskColor(result.risk_level)} bg-black/40`}>
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                
                {/* Meter Circle */}
                <div className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center bg-black/50 ${getRiskColor(result.risk_level)}`}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></div>
                  <div className="flex flex-col items-center">
                    {result.risk_level === "Critical" || result.risk_level === "High" ? (
                      <ShieldAlert className="w-10 h-10 mb-1" />
                    ) : (
                      <ShieldCheck className="w-10 h-10 mb-1" />
                    )}
                    <span className="font-bold font-heading">{result.risk_level}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">AI Analysis Report</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    {result.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
