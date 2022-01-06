import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { DBConstruct } from './db/dynamo-table';
import { ApiConstruct } from './api/api-service';

export class DynamodbOnetableExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const db = new DBConstruct(this, 'dynamo-table');
    const api = new ApiConstruct(this, 'example-api');

    api.handler.addEnvironment('TABLE_NAME', db.table.tableName);

    db.table.grantFullAccess(api.handler);
  }
}
