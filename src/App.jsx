import { Component } from 'react';
import GameContainer from './GameContainer.jsx';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 24,
            color: '#f87171',
            fontFamily: 'monospace',
            maxWidth: 640,
            margin: '40px auto',
          }}
        >
          <h2 style={{ marginBottom: 12 }}>Xato (Render error)</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
            {this.state.error?.message || this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-black" style={{ minHeight: '100vh', background: '#000' }}>
      <ErrorBoundary>
        <GameContainer />
      </ErrorBoundary>
    </div>
  );
}
