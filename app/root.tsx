import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState, useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";
import Sidebar from "./components/Sidebar";
import FloatingSettingsButton from "./components/FloatingSettingsButton";
import SettingsSidebar from "./components/SettingsSidebar";
import { getColorClasses, useTheme } from "./hooks/useTheme";
import { useSidebar } from "./hooks/useSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Navbar from "./components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryProvider } from "./lib/reactQuery/QueryProvider";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, colorTheme } = useTheme();
  const { isCollapsed, setCollapsed } = useSidebar();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sideBarForMobile, setsideBarForMobile] = useState(false);
  const colors = getColorClasses(colorTheme);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <QueryProvider>
      <html lang="en" className={theme}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
          <TooltipProvider>
            <Navbar />
            <div className="flex flex-col min-h-screen">
              {/* Sidebar for Desktop */}
              <div className="hidden lg:block">
                <Sidebar />
              </div>

              {/* sidebar for Tablets and phones */}
              <div className="lg:hidden fixed top-10 left-5 z-30">
                <motion.button
                  onClick={() => {
                    setCollapsed(false);
                    setsideBarForMobile(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${
                    colors.primary
                  } transition-colors ${isCollapsed ? "mx-auto" : ""}`}
                  title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="expand"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
              {sideBarForMobile && (
                <div className="fixed z-30 lg:hidden">
                  <Sidebar setsideBarForMobile={setsideBarForMobile} />
                </div>
              )}
              {/* Main Content */}
              <main
                className={`flex-1 xl:p-8 lg:p-5 md:px-3 md:py-6 px-2 py-5 min-h-screen transition-all ease-in-out duration-300 ${
                  isCollapsed ? "lg:ml-[64px]" : "lg:ml-[256px]"
                }`}
              >
                {children}
              </main>
            </div>
          </TooltipProvider>

          {/* Floating Settings Button */}
          <FloatingSettingsButton onClick={() => setIsSettingsOpen(true)} />

          {/* Settings Sidebar */}
          <SettingsSidebar
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />

          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </QueryProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
