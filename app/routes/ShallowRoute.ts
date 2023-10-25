/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent, ReactNode } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import AnimationRoute from './AnimationRoute';
import RedirectToConfigureRoute from './RedirectToConfigureRoute';
import { ROOT_ROUTE } from '../constants/route';

interface Props {
  routeName: string;
  location: RouteComponentProps['location'];
}

interface State {
  redirectToRefferer: boolean;
}

class ShallowRoute extends PureComponent<Props, State> {
  private _prevPathname: string | null;
  private _currenPathname: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      redirectToRefferer: false,
    };

    this._prevPathname = null;
    this._currenPathname = props.location.pathname;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this._currenPathname !== nextProps.location.pathname) {
      this._prevPathname = this._currenPathname;
      this._currenPathname = nextProps.location.pathname;
    }

    this.setState({
      redirectToRefferer: this.props.routeName !== nextProps.routeName,
    });
  }

  render(): ReactNode {
    const redirect = this.state.redirectToRefferer ? (
      <Redirect to={this.props.routeName} />
    ) : null;

    return (
      <div>
        <Route exact path="/" component={RedirectToConfigureRoute} />
        <Route
          location={this.props.location}
          key={this.props.location.key}
          path="/:pathname"
          render={(props: RouteComponentProps) => (
            <AnimationRoute {...props} prevPathname={this._prevPathname} />
          )}
        />
        {redirect}
      </div>
    );
  }
}

ShallowRoute.propTypes = {
  routeName: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
};

ShallowRoute.displayName = 'ShallowRoute';

const mapStateToProps = ({ app }: { app: { routeName: string } }) => ({
  routeName: app.routeName,
});

export default connect(mapStateToProps)(ShallowRoute);
