"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, Clock, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";

type HistoryItem = {
  id: string;
  scan_type: string;
  content: string;
  risk_level: string;
  created_at: string;
};

export default function HistoryPage() {
  const { getToken } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/history`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setHistory(data.history || []);
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [getToken]);

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Critical": return "text-destructive bg-destructive/10 border-destructive/20";
      case "High": return "text-phish-threat-orange bg-phish-threat-orange/10 border-phish-threat-orange/20";
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Low": return "text-phish-success-mint bg-phish-success-mint/10 border-phish-success-mint/20";
      default: return "text-muted-foreground";
    }
  };

  const getRiskIcon = (risk: string) => {
    if (risk === "Critical" || risk === "High") return <ShieldAlert className="w-5 h-5 text-current" />;
    return <ShieldCheck className="w-5 h-5 text-current" />;
  };

  return (
    <div className="min-h-screen p-8 md:p-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-white">Scan History</h1>
          <p className="text-muted-foreground">Review your past analyses and threat reports.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border border-dashed border-white/20 rounded-xl">
            No scan history found.
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((scan) => (
              <Card key={scan.id} className="glass-dark border-white/5 overflow-hidden group hover:bg-white/[0.02] transition-colors">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span className="uppercase px-2 py-1 bg-white/5 rounded-sm">{scan.scan_type}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3"/> 
                        {new Date(scan.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-white font-medium line-clamp-2 break-all">{scan.content}</p>
                  </div>

                  <div className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border ${getRiskColor(scan.risk_level)}`}>
                    {getRiskIcon(scan.risk_level)}
                    <span className="font-semibold tracking-wide">{scan.risk_level} Risk</span>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
