/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component, ReactNode } from 'react';

type GetComponent = () => Promise<{ default: React.ComponentType<any> }>;

const asyncComponent = (getComponent: GetComponent): React.ComponentType<any> => {
  class AsyncComponent extends Component {
    static Component: React.ComponentType<any> | null = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render(): ReactNode {
      const { Component } = this.state;

      if (Component)
        return <Component {...this.props} />;

      return null;
    }
  }

  return AsyncComponent;
};

export default asyncComponent;