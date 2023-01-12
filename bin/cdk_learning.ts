#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkLearningStack } from '../lib/cdk_learning-stack';

const app = new cdk.App();

new CdkLearningStack(app, 'CdkLearningStack', {
    env: {
        account: '702475694110',
        region: 'us-east-1',
    }
});

app.synth();