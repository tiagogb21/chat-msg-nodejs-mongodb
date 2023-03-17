import { IGroup, groupZodSchema } from "../types/interfaces/IGroup";
import { IUser } from "../types/interfaces/IUser";

export class GroupService {
  private groups: Map<string, IGroup>;

  constructor() {
    this.groups = new Map();
  }

  async createGroup(group: IGroup): Promise<IGroup> {
    const validatedGroup = groupZodSchema.parse(group);

    this.groups.set(validatedGroup._id, validatedGroup);

    return validatedGroup;
  }

  async updateGroup(groupId: string, updatedGroup: IGroup): Promise<IGroup> {
    if (!this.groups.has(groupId)) {
      throw new Error("Group not found");
    }

    const group = this.groups.get(groupId);

    const validatedGroup = groupZodSchema.parse({ ...group, ...updatedGroup });

    this.groups.set(groupId, validatedGroup);

    return validatedGroup;
  }

  async deleteGroup(groupId: string): Promise<void> {
    this.groups.delete(groupId);
  }

  async getGroup(groupId: string): Promise<IGroup> {
    if (!this.groups.has(groupId)) {
      throw new Error("Group not found");
    }

    return this.groups.get(groupId);
  }

  async addUserToGroup(groupId: string, user: IUser): Promise<IGroup> {
    if (!this.groups.has(groupId)) {
      throw new Error("Group not found");
    }

    const group = this.groups.get(groupId);
    const updatedGroup = groupZodSchema.parse({
      ...group,
      users: [...group.users, user],
    });
    this.groups.set(groupId, updatedGroup);
    return updatedGroup;
  }

  async removeUserFromGroup(groupId: string, userId: string): Promise<IGroup> {
    if (!this.groups.has(groupId)) {
      throw new Error("Group not found");
    }

    const group = this.groups.get(groupId);
    const updatedUsers = group.users.filter((user) => user._id !== userId);
    const updatedGroup = groupZodSchema.parse({
      ...group,
      users: updatedUsers,
    });
    this.groups.set(groupId, updatedGroup);
    return updatedGroup;
  }
}
