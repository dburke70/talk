const UserModel = require('../../../models/user');
const UsersService = require('../../../services/users');
const fetch = require('node-fetch');

module.exports = async ({ jwt }) => {
  // To disable Talk's built in auth plugin (plugins/talk-plugin-auth) I set the disable_components flag while initializing the Talk app in the client.
  //   This prevents Talk's Sign in button and login popup to appear when the user clicks on any of the comment reaction buttons.

  if (jwt.usatn_basename && jwt.preferred_username) {
    let isAuthorized = jwt.usatn_hma === true;
    if (!isAuthorized) {
      // The user doesn't have market access, which means they might not be authorized to post.
      // To check this, fetch the markets site configs and see if it requires market access.
      //   If it does then this user is not authorized to post, and therefore shouldn't have an account.
      const baseName = jwt.usatn_basename;
      const configUrl = `https://www.gannett-cdn.com/experiments/sites/${baseName}/config.stage.json`;
      const response = await fetch(configUrl);
      const siteConfig = await response.json();
      const coralConfigs =
        siteConfig && siteConfig.THIRDPARTYAPI
          ? siteConfig.THIRDPARTYAPI.CORALTALKCOMMENTS
          : {};
      isAuthorized = coralConfigs.REQUIRESMARKETACCESS === false;
    }

    if (isAuthorized) {
      const uniqueUsername = await UsersService.getInitialUsername(
        jwt.preferred_username
      );

      const profile = {
        id: jwt.sub,
        username: jwt.preferred_username,
        uniqueUsername: uniqueUsername.toLowerCase(),
        role:
          jwt.license_type === 'enterprise_subscriber' ? 'STAFF' : 'COMMENTER',
        tags:
          jwt.usatn_hma && jwt.license_type !== 'enterprise_subscriber'
            ? [
                {
                  tag: {
                    name: 'SUBSCRIBER',
                    permissions: {
                      public: true,
                      self: false,
                      roles: [],
                    },
                    models: ['USERS'],
                    created_at: new Date(),
                  },
                },
              ]
            : [],
      };

      // Automatically approve the user and email address, since this was already done in GUP.
      const user = await UserModel.findOneAndUpdate(
        {
          id: profile.id,
        },
        {
          id: profile.id,
          username: profile.username,
          status: {
            username: {
              status: 'SET',
            },
          },
          lowercaseUsername: profile.uniqueUsername,
          metadata: {
            displayName: profile.username,
          },
          role: profile.role,
          profiles: [
            {
              id: profile.uniqueUsername,
              provider: 'local',
              metadata: {
                confirmed_at: new Date(),
              },
            },
          ],
          tags: profile.tags,
        },
        {
          setDefaultsOnInsert: true,
          new: true,
          upsert: true,
        }
      );

      return user;
    }
  }

  return null;
};
