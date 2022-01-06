import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DBConstruct extends Construct {
  public table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new Table(this, 'DynamoDBTable', {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
    });
  }
}
