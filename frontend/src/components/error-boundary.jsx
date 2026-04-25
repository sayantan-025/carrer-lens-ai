import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { TacticalGhostButton } from "./buttons/tactical-ghost-button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="size-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertCircle className="size-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white tracking-tighter uppercase">Protocol Interrupted</h2>
            <p className="text-zinc-500 max-w-xs mx-auto text-sm">
              The application encountered a runtime error or failed to load a system module.
            </p>
          </div>
          <TacticalGhostButton 
            onClick={() => window.location.reload()}
            icon={RefreshCw}
          >
            Reinitialize System
          </TacticalGhostButton>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
