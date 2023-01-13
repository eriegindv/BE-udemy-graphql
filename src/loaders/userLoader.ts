import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "..";

type BatchUser = (ids: Array<number>) => Promise<Array<User>>;

const batchUsers: BatchUser = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const userHashMap: Record<string, User> = {};
  users.forEach((user) => (userHashMap[user.id] = user));

  return ids.map((id) => userHashMap[id]);
};

// @ts-ignore
export default new DataLoader<number, User>(batchUsers);
