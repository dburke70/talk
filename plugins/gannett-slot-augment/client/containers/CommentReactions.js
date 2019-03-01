import { gql, compose } from 'react-apollo';
import CommentReactions from '../components/CommentReactions';
import { withFragments, withEmit } from 'coral-framework/hocs';
import { getSlotFragmentSpreads } from 'plugin-api/beta/client/utils';

const slots = ['commentReactions'];

const fragments = {
  comment: gql`
    fragment TalkFeaturedComments_Comment_CommentReactions on Comment {
      replyCount
      ${getSlotFragmentSpreads(slots, 'CommentReactions')}
    }
  `,
};

export default compose(
  withFragments(fragments),
  withEmit
)(CommentReactions);
