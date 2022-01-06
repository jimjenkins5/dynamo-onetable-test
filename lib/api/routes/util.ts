import { Request, Response, Router } from "@silvermine/lambda-express";
import { Org, User, UserAddress } from "../database";

const utilRouter = new Router();

utilRouter.get("/seed-db", async (req: Request, res: Response) => {
  const org1 = await Org.create({ name: "Organization 1" });

  const user1 = await User.create({
    name: "John Smith",
    orgId: org1.id,
  });

  const user1Address1 = await UserAddress.create({
    orgId: org1.id,
    userId: user1.id,
    street: "4109 Market St",
    city: "Philadelphia",
    state: "PA",
    zip: "19104",
  });

  const user1Address2 = await UserAddress.create({
    orgId: org1.id,
    userId: user1.id,
    street: "402 Locust St",
    city: "Philadelphia",
    state: "PA",
    zip: "19104",
  });

  const user2 = await User.create({
    name: "John Doe",
    orgId: org1.id,
  });

  const user2Address1 = await UserAddress.create({
    orgId: org1.id,
    userId: user2.id,
    street: "102 Ludlow St.",
    city: "Philadelphia",
    state: "PA",
    zip: "19104",
  });

  const user2Address2 = await UserAddress.create({
    orgId: org1.id,
    userId: user2.id,
    street: "211 Walnut St.",
    city: "Philadelphia",
    state: "PA",
    zip: "19104",
  });

  return res.json({
    success: true,
    message: "Database seeded",
    orgs: [ org1 ],
    users: [ user1, user2 ],
    UserAddresses: [user1Address1, user1Address2, user2Address1, user2Address2],
  });
});

export default utilRouter;
