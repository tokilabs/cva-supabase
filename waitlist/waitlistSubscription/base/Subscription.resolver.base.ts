/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import { isRecordNotFoundError } from "../../src/prisma.util";
import { MetaQueryPayload } from "../../src/util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control"
import { Public } from "../../src/decorators/public.decorator";
import { CreateSubscriptionArgs } from "./CreateSubscriptionArgs";
import { UpdateSubscriptionArgs } from "./UpdateSubscriptionArgs";
import { DeleteSubscriptionArgs } from "./DeleteSubscriptionArgs";
import { SubscriptionCountArgs } from "./SubscriptionCountArgs";
import { SubscriptionFindManyArgs } from "./SubscriptionFindManyArgs";
import { SubscriptionFindUniqueArgs } from "./SubscriptionFindUniqueArgs";
import { Subscription } from "./Subscription";
import { SubscriptionService } from "../Subscription.service";
import Error from "next/error";

@graphql.Resolver(() => Subscription)
export class SubscriptionResolverBase {
  constructor(
    protected readonly service: SubscriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async _subscriptionsMeta(
    @graphql.Args() args: SubscriptionCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [Subscription])
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async subscriptions(
    @graphql.Args() args: SubscriptionFindManyArgs
  ): Promise<Subscription[]> {
    return this.service.findMany(args);
  }

  @graphql.Query(() => Subscription, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "own",
  })
  async subscription(
    @graphql.Args() args: SubscriptionFindUniqueArgs
  ): Promise<Subscription | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @Public()
  @graphql.Mutation(() => Subscription)
  async createSubscription(
    @graphql.Args() args: CreateSubscriptionArgs
  ): Promise<Subscription> {
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }
  @graphql.Mutation(() => Subscription)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "update",
    possession: "any",
  })
  async updateSubscription(
    @graphql.Args() args: UpdateSubscriptionArgs
  ): Promise<Subscription | null> {
    const error = new Error()
    try {
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Subscription)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "delete",
    possession: "any",
  })
  async deleteSubscription(
    @graphql.Args() args: DeleteSubscriptionArgs
  ): Promise<Subscription | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}