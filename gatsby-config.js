const appConfig = require('./appConfig');
const path = require('path');

require('dotenv').config();

const buildCredentials = ({ PROJECT_ID, PRIVATE_KEY, PRIVATE_KEY_ID }) => ({
  type: 'service_account',
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n'),
  client_email: `event-calendar@event-calendar-280122.iam.gserviceaccount.com`,
  client_id: '',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${PROJECT_ID}%40appspot.gserviceaccount.com`,
});

const SPREADSHEET_ID = '1OWY4D3BTks3bi2Jsr9TjxSDt4YhP4EB5rXbIbbfoKnA';

const { theme, ...siteMetadata } = appConfig;

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: SPREADSHEET_ID,
        worksheetTitle: 'Events',
        credentials: process.env.PROJECT_ID
          ? buildCredentials(process.env)
          : path.resolve(process.env.CREDENTIALS_PATH),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/media`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-event-calendar',
        short_name: 'starter-calendar',
        start_url: '/',
        background_color: theme.background,
        theme_color: theme.brand,
        display: 'minimal-ui',
        icon: 'media/icon.svg',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `<URL>`,
        queryLimit: 1000, // Default to 100
        contentTypes: ['events'],
      },
    },
  ],
};
