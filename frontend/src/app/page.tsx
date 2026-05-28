import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />

        {/* AI Mascot Placeholder */}
        <div className="mb-8 w-24 h-24 rounded-full glass flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-pulse">
          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight leading-tight">
          Detect Threats.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Defend Your Digital Life.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          PhishGuard AI analyzes suspicious messages, emails, and URLs in real-time, 
          providing explainable AI insights to keep you safe from online scams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <button className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-transform hover:scale-105">
            Analyze Message
          </button>
          <button className="h-12 px-8 rounded-lg glass font-medium text-white flex items-center justify-center hover:bg-white/10 transition-colors">
            Scan URL
          </button>
        </div>
      </main>
    </div>
  );
}
