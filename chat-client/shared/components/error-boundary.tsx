import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class RoomLayout extends Component<Props, State> {
  public constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  public static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  public componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('ERROR: ', error);
  }
  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default RoomLayout;
