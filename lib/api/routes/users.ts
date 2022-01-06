import { Router, Response, Request } from "@silvermine/lambda-express";
import { table, User } from "../database";
import { UserItem } from "../database";

export default {
  getAll: async function (req: Request, res: Response) {
    console.log(`getting users for ${req.params.orgId}`);

    return res.json({
      success: true,
      users: await User.find({ orgId: req.params.orgId } as UserItem),
    });
  },

  getDetailed: async function (req: Request, res: Response) {
    console.log(`getting users and addresses for ${req.params.orgId} and ${req.params.userId}`);

    return res.json({
      success: true,
      users: await table.fetch(["User", "UserAddress", "Org"], {
        pk: `org#${req.params.orgId}`,
        sk: { begins: `User#${req.params.userId}` },
      }),
    });
  },
};
