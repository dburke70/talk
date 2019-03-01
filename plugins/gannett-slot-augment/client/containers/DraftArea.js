import { gql, compose } from 'react-apollo';
import DraftArea from '../components/DraftArea';
import { withFragments, withEmit } from 'coral-framework/hocs';
import { getSlotFragmentSpreads } from 'plugin-api/beta/client/utils';
import Comment from 'plugins/talk-plugin-featured-comments/client/containers/Comment';

const slots = ['draftArea'];

const fragments = {
  root: gql`
    ${Comment.fragments.root}
  `,
  comment: gql`
    fragment TalkFeaturedComments_Comment_DraftArea on Comment {
      replyCount
      ${getSlotFragmentSpreads(slots, 'DraftArea')}
    }
  `,
};

export default compose(
  withFragments(fragments),
  withEmit
)(DraftArea);
