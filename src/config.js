const dev = {
  STRIPE_KEY: "pk_test_mFOTEjCRlK8aWZYn2OBtz5PD00C6giAjRT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-10w3h6u777k2l"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://b0wev1o64j.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_HIqYcCJGA",
    APP_CLIENT_ID: "5g1376mb75jh8tm0kld71avl5r",
    IDENTITY_POOL_ID: "us-west-2:e52b7a03-3f0f-4b84-943e-b7c00bc181c4"
  },
  social: {
    FB: "180201436602292"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_mFOTEjCRlK8aWZYn2OBtz5PD00C6giAjRT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1nnmh1lsi97hu"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://zpqi203450.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_38xaMAEdN",
    APP_CLIENT_ID: "3jd159neqtaks2gt0ppnuaps82",
    IDENTITY_POOL_ID: "us-west-2:e68981aa-8e08-42bf-ac3c-18060dc0c201"
  },
  social: {
    FB: "180201436602292"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};