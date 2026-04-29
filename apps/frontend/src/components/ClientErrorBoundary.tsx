'use client';
import { Component, ReactNode } from 'react';
import { reportLog } from '../lib/api';

export class ClientErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) {
    reportLog('error', error.message, { stack: error.stack });
  }
  render() {
    if (this.state.hasError) return <div>Something went wrong.</div>;
    return this.props.children;
  }
}
