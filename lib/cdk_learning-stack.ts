import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import {ManualApprovalStep} from 'aws-cdk-lib/pipelines';
import {MyPipelineAppStage} from './stage';

export class CdkLearningStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'MyPipeline',
        synth: new ShellStep('Synth',{
            input: CodePipelineSource.gitHub('YuliiaKurylchyk/cdk_learning', 'master'),
            installCommands: ['npm i -g npm@latest'],
            commands: ['npm ci',
                       'npm run build',
                       'npx cdk synth']
            })
    })

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
        env: {
            account: '702475694110',
            region: 'us-east-1',
        }
    }));

    testingStage.addPost(new ManualApprovalStep("Manual Approval Step to Deploy to Prod"));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
       env: {
            account: '702475694110',
            region: 'us-east-1',
        }
    }));

  }
}
