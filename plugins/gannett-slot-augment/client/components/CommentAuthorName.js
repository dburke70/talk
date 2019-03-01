import React from 'react';
import styles from './CommentAuthorName.css';

class CommentAuthorName extends React.Component {
  isStaff = tags => !tags.every(t => t.tag.name !== 'STAFF');

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

  render() {
    const { comment } = this.props;

    // If the user is a staff member, replace the AuthName component (which includes the ignore feature) with this component.
    if (comment && comment.user && this.isStaff(comment.tags)) {
      this.setAuthorNameRef = commentAuthorNameContainerRef => {
        if (commentAuthorNameContainerRef) {
          const authorNameContainer = this.findParent(
            commentAuthorNameContainerRef,
            'talk-slot-comment-author-name'
          );

          if (authorNameContainer) {
            var authorMenuButton = authorNameContainer.querySelector(
              '.talk-plugin-author-menu-button'
            );
            authorMenuButton.classList.add('forced-hidden');
          }
        }
      };

      return (
        <span
          ref={this.setAuthorNameRef}
          className={styles.suppressedIgnoreAuthorName}
        >
          {comment.user.username}
        </span>
      );
    }

    return null;
  }
}

export default CommentAuthorName;
