import { Component, type ReactNode, type ReactElement } from "react";

import { Button } from "./shadcn/button";

export class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: undefined as Error | undefined };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error: error as Error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render(): ReactElement | null {
    if (this.state.hasError) {
      return (
        <>
          <p>An error occurred: {this.state.error?.message}</p>
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
            }}
          >
            Try Again
          </Button>
        </>
      );
    }

    return <>{this.props.children}</>;
  }
}
