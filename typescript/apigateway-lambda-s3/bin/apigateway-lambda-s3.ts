#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApigatewayLambdaS3Stack } from '../lib/apigateway-lambda-s3-stack';

const app = new cdk.App();
new ApigatewayLambdaS3Stack(app, 'ApigatewayLambdaS3Stack');
