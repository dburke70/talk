import React from 'react';
import t from 'coral-framework/services/i18n';

class CommentReactions extends React.Component {
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

  updateReplyCount = (actionsContainer, replyCount) => {
    if (actionsContainer) {
      let replyCountEl = actionsContainer.querySelector('.gannett-reply-count');

      if (replyCountEl) {
        // Refresh reply count.  This executes when a user adds a new reply
        replyCountEl.innerText = replyCount;
      } else {
        // Find the Reply button
        const replyButton = actionsContainer.querySelector(
          '.talk-plugin-replies-reply-button'
        );

        // Create the reply count span and append it to the Reply button
        if (replyButton) {
          replyCountEl = document.createElement('span');
          replyCountEl.className = 'gannett-reply-count';
          replyCountEl.innerText = replyCount;

          replyButton.appendChild(replyCountEl);
        }
      }
    }
  };

  updateShowMoreReplies = (actionsContainer, replyCount) => {
    if (actionsContainer) {
      const commentWrapper = this.findParent(
        actionsContainer,
        'talk-stream-comment-wrapper'
      );

      if (commentWrapper) {
        // Find the load-more-replies that's a direct child of the comment wrapper.  This will avoid finding nested elements
        for (var i = 0; i < commentWrapper.children.length; i++) {
          const nextEl = commentWrapper.children[i];
          if (nextEl.classList.contains('talk-load-more-replies')) {
            const showMoreRepliesButton = nextEl.querySelector(
              '.talk-load-more button'
            );
            if (showMoreRepliesButton) {
              const replies = t('gannett-reply-count.replies');
              const remainingReplies = replyCount - 3;
              showMoreRepliesButton.innerText = `${replies} (${remainingReplies})`;
              showMoreRepliesButton.onclick = () => {
                if (remainingReplies > 3) {
                  const newRemainingReplies = remainingReplies - 3;
                  showMoreRepliesButton.innerText = `${replies} (${newRemainingReplies})`;
                }
              };
            }
          }
        }
      }
    }
  };

  render() {
    const { comment, emit } = this.props;
    this.setCommentReactionsRef = reactionsContainerRef => {
      if (reactionsContainerRef) {
        const actionsContainer = this.findParent(
          reactionsContainerRef,
          'talk-stream-comment-actions-container'
        );

        const reportEl = actionsContainer.querySelector(
          '.talk-plugin-flags-button'
        );
        reportEl.onclick = () => {
          emit('action.gannett_report_tap');
        };

        if (reactionsContainerRef && comment && comment.replyCount) {
          if (actionsContainer) {
            // Add the total reply count to the Reply button
            this.updateReplyCount(actionsContainer, comment.replyCount);

            // Add the remaining reply count to the 'Show More Replies' button text
            if (actionsContainer && comment.replyCount > 3) {
              this.updateShowMoreReplies(actionsContainer, comment.replyCount);
            }
          }
        }
      }
    };

    return <span ref={this.setCommentReactionsRef} />;
  }
}

export default CommentReactions;
