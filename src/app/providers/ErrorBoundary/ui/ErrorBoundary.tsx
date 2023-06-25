import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import NotFound from 'shared/ui/NotFound/NotFound';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  // eslint-disable-next-line
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  // eslint-disable-next-line
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Suspense fallback="">
          <NotFound title='Произошла ошибка' subtitle='Попробуйте обновить страницу' />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
