import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ApiConstruct extends Construct {
  public handler: NodejsFunction;
  public api: RestApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.handler = new NodejsFunction(this, 'handler');

    this.api = new RestApi(this, 'api');

    const proxyIntegration = new LambdaIntegration(this.handler);

    this.api.root.addProxy({
      anyMethod: true,
      defaultIntegration: proxyIntegration,
    });
  }
}
