import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { withEmit } from 'coral-framework/hocs';
import Header from '../components/Header';
import { usernameSelector } from 'plugin-api/beta/client/selectors/auth';

const mapStateToProps = state => ({
  username: usernameSelector(state),
});

export default compose(
  connect(mapStateToProps),
  withEmit
)(Header);
