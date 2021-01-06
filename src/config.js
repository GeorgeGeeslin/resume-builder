const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "lonestarresumes-1",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://t92scd8uqf.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_T4AP4yAny",
    APP_CLIENT_ID: "7rmnfspdgs85mlvg3npfnlkurp",
    IDENTITY_POOL_ID: "us-east-1:aabbf421-ae67-44c7-9bcc-0bf4ecc85e51",
  },
};

export default config;