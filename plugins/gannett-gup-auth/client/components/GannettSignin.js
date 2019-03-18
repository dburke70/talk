import React from 'react';
import styles from './GannettSignin.css';
import DraftArea from 'coral-embed-stream/src/tabs/stream/containers/DraftArea';
import t from 'coral-framework/services/i18n';

class GannettSignin extends React.Component {
  state = {
    disableTextArea: false,
  };

  handleClick = function() {
    this.props.emit('action.gannett_posting_not_authorized');
  };

  render() {
    const { root } = this.props;

    if (root.me) return null;

    const input = {
      body: '',
      tags: Array(0),
    };

    return (
      <div
        className={styles.gannettSigninWrapper}
        onClick={() => this.handleClick()}
      >
        <div className={styles.gannettSigninOverlay} />
        <DraftArea
          id="gannettSigninText"
          root={root}
          input={input}
          disabled={false}
          charCountEnable={false}
          onInputChange={() => {}}
        />
        <div className={styles.gannettSigninButton}>
          {t('comment_box.post')}
        </div>
      </div>
    );
  }
}

export default GannettSignin;
