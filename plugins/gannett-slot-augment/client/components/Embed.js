import React from 'react';
import t from 'coral-framework/services/i18n';

/*
  Alters components not placed in a specific slot
*/

class StreamFilter extends React.Component {
  findParent = (startingContainer, classToFind) => {
    if (startingContainer) {
      let parentEl = startingContainer.parentElement;
      while (parentEl) {
        if (parentEl.classList.contains(classToFind)) {
          return parentEl;
        }
        parentEl = parentEl.parentElement;
      }
    }
  };

  getRemainingCommentCount = () => {
    const asset = this.props.root.asset;

    let visibleCommentCount = asset.comments.nodes.length;

    asset.comments.nodes.forEach(comment => {
      visibleCommentCount += this.getNestedReplyCount(comment);
    });

    return asset.totalCommentCount - visibleCommentCount;
  };

  getNestedReplyCount = comment => {
    let totalReplies = comment.replyCount;

    if (comment.replyCount > 0) {
      comment.replies.nodes.forEach(reply => {
        totalReplies += this.getNestedReplyCount(reply);
      });
    }

    return totalReplies;
  };

  render() {
    this.setEmbedRef = embedContainerRef => {
      if (embedContainerRef) {
        const embedContainer = this.findParent(
          embedContainerRef,
          'talk-embed-stream'
        );

        if (embedContainer) {
          // Change 'All Comments' to 'All'
          const allCommentsButton = embedContainer.querySelector(
            '.talk-tab-content .talk-tab-active > .talk-tab-button'
          );

          if (allCommentsButton) {
            allCommentsButton.innerHTML = allCommentsButton.innerHTML.replace(
              t('stream.all_comments'),
              t('gannett-embed.comment-title')
            );
          }

          // Change 'view more comments' to 'show more comments'
          //  and append the number of remaining comments
          const loadMoreButton = embedContainer.querySelector(
            '.talk-stream-comments-container > .talk-load-more > button'
          );

          const showMore = t('gannett-embed.show-more-comments');
          let remainingComments = this.getRemainingCommentCount();

          if (remainingComments > 0) {
            loadMoreButton.innerText = `${showMore} (${remainingComments})`;
          }
        }
      }
    };

    return <span ref={this.setEmbedRef} />;
  }
}

export default StreamFilter;
