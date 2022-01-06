import { OneSchema, Table } from 'dynamodb-onetable';
import DynamoDB from 'aws-sdk/clients/dynamodb'
const client = new DynamoDB.DocumentClient();

export interface UserItem {
  id: string;
  orgId: string;
  name: string;
  created?: Date;
  updated?: Date;
}

export interface OrgItem {
  id: string;
  name: string;
  created?: Date;
  updated?: Date;
}

export interface UserAddressItem {
  id: string;
  orgId: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  created?: Date;
  updated?: Date;
}

const schema: OneSchema = {
  version: '0.0.1',
  indexes: {
    primary: { hash: 'pk', sort: 'sk' },
  },
  models: {
    Org: {
      pk: { type: String, value: 'org#${id}' },
      sk: { type: String, value: 'org#${id}' },

      id: { type: String, required: true, uuid: true },
      name: { type: String, required: true },
    },
    User: {
      pk: { type: String, value: 'org#${orgId}' },
      sk: { type: String, value: 'User#${id}' },

      id: { type: String, required: true, uuid: true },
      orgId: { type: String, required: true },
      name: { type: String, required: true },
    },
    UserAddress:   {
      pk: { type: String, value: 'org#${orgId}' },
      sk: { type: String, value: 'User#${userId}#address#${id}' },

      id: { type: String, required: true, uuid: true },
      orgId: { type: String, required: true },
      userId: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
  }
}

export const table = new Table({
  name: process.env.TABLE_NAME,
  schema: schema,
  client: client,
});

export const Org = table.getModel<OrgItem>('Org');
export const User = table.getModel<UserItem>('User');
export const UserAddress = table.getModel<UserAddressItem>('UserAddress');
