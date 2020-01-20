export default {
  STRIPE_KEY: "pk_test_mFOTEjCRlK8aWZYn2OBtz5PD00C6giAjRT",
  MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-west-2",
      BUCKET: "nanowrit-notes-uploads"
    },
    apiGateway: {
      REGION: "us-west-2",
      URL: "https://oep9t9jqs7.execute-api.us-west-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-west-2",
      USER_POOL_ID: "us-west-2_bXf1J3vZf",
      APP_CLIENT_ID: "3on5n5ocag0bep64h7rc23r6in",
      IDENTITY_POOL_ID: "us-west-2:881e2366-6389-41ab-aa3c-fa9ff36df0ff"
    }
  };