import { gql } from 'react-apollo';
import CommentAuthorName from '../components/CommentAuthorName';
import { withFragments } from 'plugin-api/beta/client/hocs';
import { getSlotFragmentSpreads } from 'plugin-api/beta/client/utils';

const slots = ['commentAuthorName'];

const fragments = {
  comment: gql`
    fragment TalkFeaturedComments_Comment_CommentAuthorName on Comment {
      tags {
        tag {
          name
        }
      }
      user {
        username
      }
      ${getSlotFragmentSpreads(slots, 'CommentAuthorName')}
    }
  `,
};

export default withFragments(fragments)(CommentAuthorName);
