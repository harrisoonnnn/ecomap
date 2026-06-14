import type { Metadata } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeProvider, themeInitScript } from "@/lib/theme/ThemeProvider";
import { WorkspaceAIProvider } from "@/lib/ai/WorkspaceAIContext";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CopilotDock } from "@/components/copilot/CopilotDock";

export const metadata: Metadata = {
  title: "Ecomap — Transform Events Into Essays & Research",
  description:
    "The AI Research Operating System for Economics, Finance & Policy. Turn real-world events into structured essay ideas, research frameworks, evidence chains and policy proposals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <WorkspaceAIProvider>
              <AnimatedBackground />
              <Navbar />
              <main className="relative z-10 min-h-[60vh]">{children}</main>
              <Footer />
              <CopilotDock />
            </WorkspaceAIProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
