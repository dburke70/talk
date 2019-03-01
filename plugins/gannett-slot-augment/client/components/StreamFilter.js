import React from 'react';
import t from 'coral-framework/services/i18n';

/*
  Exposes the currently selected sorting rule next to the filter dropdown.
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

  render() {
    const { sortBy, sortOrder } = this.props;

    this.setStreamFilterRef = streamFilterContainerRef => {
      if (streamFilterContainerRef) {
        const streamFilterContainer = this.findParent(
          streamFilterContainerRef,
          'talk-slot-stream-filter'
        );

        if (streamFilterContainer) {
          const viewingOptionsLabel = streamFilterContainer.querySelector(
            '.talk-plugin-viewing-options span'
          );

          if (viewingOptionsLabel) {
            let sortingBy = '';

            switch (sortBy) {
              case 'CREATED_AT':
                // Newest and Oldest
                sortingBy =
                  sortOrder === 'DESC'
                    ? t('talk-plugin-sort-newest.label')
                    : t('talk-plugin-sort-oldest.label');
                break;
              case 'DOWNVOTES':
                sortingBy = t('talk-plugin-sort-most-downvoted.label');
                break;
              case 'UPVOTES':
                sortingBy = t('talk-plugin-sort-most-upvoted.label');
                break;
              case 'LIKES':
                sortingBy = t('talk-plugin-sort-most-liked.label');
                break;
              case 'LOVES':
                sortingBy = t('talk-plugin-sort-most-loved.label');
                break;
              case 'REPLIES':
                sortingBy = t('talk-plugin-sort-most-replied.label');
                break;
              case 'RESPECTS':
                sortingBy = t('talk-plugin-sort-most-respected.label');
                break;
              default:
                '';
                break;
            }

            viewingOptionsLabel.innerHTML = sortingBy;
          }
        }
      }
    };

    return <span ref={this.setStreamFilterRef} />;
  }
}

export default StreamFilter;
