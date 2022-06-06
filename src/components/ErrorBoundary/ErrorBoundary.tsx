import React, {ReactNode, ErrorInfo} from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{textAlign: 'center'}}>
          <p>Something went wrong:</p>
          <pre style={{color: 'red'}}>{this.state.error.message}</pre>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary