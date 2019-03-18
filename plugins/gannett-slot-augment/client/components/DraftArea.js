import React from 'react';

class DraftArea extends React.Component {
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
    const {
      root: { me },
      comment,
      emit,
    } = this.props;

    // Events within this component only apply to logged in users
    if (!me) {
      return null;
    }

    this.setDraftArea = draftAreaSpanRef => {
      if (draftAreaSpanRef) {
        const commentboxContainer = this.findParent(
          draftAreaSpanRef,
          'talk-plugin-commentbox-container'
        );

        if (commentboxContainer) {
          const richTextEl = commentboxContainer.querySelector(
            '.talk-plugin-rich-text-content'
          );

          let actionName =
            typeof comment === 'undefined'
              ? 'action.gannett_text_editor_focus'
              : 'action.gannett_text_editor_reply_focus';

          if (/iP(hone|od|ad)/.test(navigator.platform)) {
            const vers = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            const version = vers.length > 1 ? parseInt(vers[1], 10) : 0;

            if (version === 11) {
              actionName = `${actionName}_iOS11`;
            }
          }

          richTextEl.onfocus = () => {
            emit(actionName);
          };
        }
      }
    };

    return <span ref={this.setDraftArea} />;
  }
}

export default DraftArea;
