import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10" />
      
      <div className="glass p-8 rounded-2xl border-white/10 relative z-10">
        <SignIn appearance={{
          elements: {
            formButtonPrimary: 
              "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(0,240,255,0.4)]",
            card: "bg-transparent shadow-none border-none",
            headerTitle: "text-foreground font-heading text-2xl",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "border-border hover:bg-white/5",
            socialButtonsBlockButtonText: "text-foreground font-medium",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-border text-foreground",
            footerActionLink: "text-primary hover:text-primary/80"
          }
        }} />
      </div>
    </div>
  );
}
