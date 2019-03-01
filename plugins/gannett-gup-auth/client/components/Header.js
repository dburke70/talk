import React from 'react';
import styles from './Header.css';
import t from 'coral-framework/services/i18n';

class Header extends React.Component {
  componentDidMount = () => {
    if (this.props.config.presentTeaser) {
      // Hide comments
      document
        .querySelector('.talk-embed-stream-tab-bar')
        .classList.add('hidden');
    }
  };

  render() {
    const {
      config: { presentTeaser },
      root: { asset },
      username,
    } = this.props;

    if (presentTeaser) {
      const numberOfCommentsForisplay =
        asset.totalCommentCount === 1
          ? ` | 1 ${t('comment_singular')}`
          : ` | ${asset.totalCommentCount} ${t('comment_plural')}`;

      this.handleTeaserBtnClick = () => {
        this.props.emit('talk-teaser-tapped');
      };

      return (
        <button
          className={styles.teaserButton}
          onClick={() => this.handleTeaserBtnClick()}
        >
          <strong>{t('gannett-header.join_the_discussion')}</strong>
          <span>{numberOfCommentsForisplay.toLowerCase()}</span>
        </button>
      );
    }

    if (username) {
      return (
        <div className={styles.headerContainer}>
          {t('gannett-header.posting_as')}
          <strong className={styles.headerUsername}>{username}</strong>
        </div>
      );
    }

    return null;
  }
}

export default Header;
