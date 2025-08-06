import { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>🚨 Oops! Something went wrong</h2>
          <div className="error-details">
            <p>We encountered an error while loading the Pokemon data.</p>
            <p>This might be due to:</p>
            <ul>
              <li>Network connection issues</li>
              <li>API server problems</li>
              <li>Temporary service interruption</li>
            </ul>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;