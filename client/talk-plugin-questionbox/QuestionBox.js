import React from 'react';
import cn from 'classnames';
import styles from './QuestionBox.css';
import {Icon} from 'coral-ui';

import Slot from 'coral-framework/components/Slot';

const QuestionBox = ({content, enable}) => (
  <div className={cn(styles.qbInfo, {[styles.hidden]: !enable}, 'questionbox-info')}>
    <div className={cn(styles.qbBox, 'questionbox-box')}>
      <Icon name="chat_bubble" className={cn(styles.iconBubble)} />
      <Icon name="person" className={cn(styles.iconPerson)} />
    </div>

    <div className={cn(styles.qbContent, 'questionbox-content')}>
      {content}
    </div>

    <Slot fill="streamQuestionArea" />
  </div>
);

export default QuestionBox;
