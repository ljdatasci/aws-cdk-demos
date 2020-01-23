import * as cdk from '@aws-cdk/core';
import s3 = require('@aws-cdk/aws-s3');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');

export class ApigatewayLambdaS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'PhotoBucket');
    
    const getPhotosHandler = new lambda.Function(this, 'PhotosHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'getPhotos.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        BUCKET: bucket.bucketName,
      }
    });

    bucket.grantReadWrite(getPhotosHandler);

    const api = new apigateway.RestApi(this, 'photos-api', {
      restApiName: 'Photos Service',
      description: "This service serves photos stored in an S3 bucket"
    });

    //const photos = api.root.addResource('photos');

    const getPhotosIntegration = new apigateway.LambdaIntegration(getPhotosHandler);
    //photos.addMethod('GET', getPhotosIntegration);
    api.root.addMethod('GET', getPhotosIntegration);

    
  }
}
