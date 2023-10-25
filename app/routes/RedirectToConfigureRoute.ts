/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { CONFIGURE_ROUTE } from '../constants/route';
import { noop } from '../../utils/misc';

interface Props {
  onRedirectToPath: (routeName: string) => void;
}

class RedirectToConfigureRoute extends PureComponent<Props> {
  static propTypes = {
    onRedirectToPath: PropTypes.func,
  };

  static defaultProps = {
    onRedirectToPath: noop,
  };

  componentDidMount() {
    const { onRedirectToPath } = this.props;
    onRedirectToPath(CONFIGURE_ROUTE);
  }

  render(): ReactNode {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  onRedirectToPath: (routeName: string) => dispatch(redirectToPath(routeName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedirectToConfigureRoute);