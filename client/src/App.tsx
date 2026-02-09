import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ServiceList from "@/pages/ServiceList";
import Guidance from "@/pages/Guidance";


import { LanguageProvider } from "./lib/LanguageContext";
import { ThemeProvider } from "./lib/ThemeContext";
import { Chatbot } from "@/components/Chatbot";
import { ThemeToggle } from "@/components/ThemeToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:type" component={ServiceList} />
      <Route path="/guidance/:id" component={Guidance} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <Chatbot />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
