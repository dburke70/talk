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

    const iOSversion = () => {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        const v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        // const major = parseInt(v[1], 10);
        // const minor = parseInt(v[2], 10);
        // const version =  parseInt(v[3] || 0, 10);
        // return `{major}.{minor}.{version}`;
        return parseInt(v[1], 10);
      }
    };

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

          const actionName =
            typeof comment === 'undefined'
              ? 'action.gannett_text_editor_focus'
              : 'action.gannett_text_editor_reply_focus';

          richTextEl.onfocus = () => {
            emit(actionName);

            if (iOSversion === 11) {
              emit('action.gannett_text_editor_focus_iOS11');
            }
          };
        }
      }
    };

    return <span ref={this.setDraftArea} />;
  }
}

export default DraftArea;
