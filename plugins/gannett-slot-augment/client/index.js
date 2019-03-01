import CommentAuthorName from './containers/CommentAuthorName';
import CommentReactions from './containers/CommentReactions';
import StreamFilter from './containers/StreamFilter';
import DraftArea from './containers/DraftArea';
import translations from './translations.yml';

export default {
  translations,
  slots: {
    commentAuthorName: [CommentAuthorName],
    commentReactions: [CommentReactions],
    streamFilter: [StreamFilter],
    draftArea: [DraftArea],
  },
};
