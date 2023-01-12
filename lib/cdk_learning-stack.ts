import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';

export class CdkLearningStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
        pipelineName: 'MyPipeline',
        synth: new ShellStep('Synth',{
            input: CodePipelineSource.gitHub('YuliiaKurylchyk/cdk_learning', 'master'),
            commands: ['npm ci',
                        'npm run build',
                        'npm cdk synth']
            })
    })
  }
}
