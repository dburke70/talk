import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import StreamFilter from '../components/StreamFilter';
import {
  sortBySelector,
  sortOrderSelector,
} from 'plugin-api/beta/client/selectors/stream';

const mapStateToProps = state => ({
  sortBy: sortBySelector(state),
  sortOrder: sortOrderSelector(state),
});

export default compose(connect(mapStateToProps))(StreamFilter);
