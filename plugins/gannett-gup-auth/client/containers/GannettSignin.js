import { gql, compose } from 'react-apollo';
import { withFragments, withEmit } from 'coral-framework/hocs';
import Comment from 'plugins/talk-plugin-featured-comments/client/containers/Comment';
import GannettSignin from '../components/GannettSignin';

const fragments = {
  root: gql`
    ${Comment.fragments.root}
  `,
};

export default compose(
  withFragments(fragments),
  withEmit
)(GannettSignin);
