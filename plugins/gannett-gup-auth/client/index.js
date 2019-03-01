import Header from './containers/Header';
import GannettSignin from './containers/GannettSignin';
import translations from './translations.yml';

export default {
  translations,
  slots: {
    embed: [Header],
    stream: [GannettSignin],
  },
};
