/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react'

interface Props {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })
  }

  render() {
    const { hasError, errorInfo } = this.state

    if (hasError) {
      // Render fallback UI
      return (
        <div
          style={{
            border: '1px solid crimson',
            borderRadius: '7px',
            padding: '12px',
            color: 'crimson'
          }}
        >
          <span>
            Unexpected error occurred. You may want to reload the page and try it
            again.&nbsp;
            <span
              style={{ cursor: 'pointer', color: '#0077FF' }}
              onClick={() => {
                window.location.reload()
              }}
            >
              Reload
            </span>
          </span>
          {errorInfo && (
            <div style={{ marginLeft: '2px', marginTop: '7px' }}>
              <details>
                <summary>Click for error details (developers use only)</summary>
                <code style={{ whiteSpace: 'pre' }}>{errorInfo.componentStack}</code>
              </details>
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
