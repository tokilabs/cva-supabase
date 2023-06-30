import { Request } from "express";
import * as nestAccessControl from "nest-access-control";
import { SubscriptionService } from "../subscription.service";
import { SubscriptionCreateInput } from "./SubscriptionCreateInput";
import { SubscriptionWhereUniqueInput } from "./SubscriptionWhereUniqueInput";
import { SubscriptionUpdateInput } from "./SubscriptionUpdateInput";
import { Subscription } from "./Subscription";
export declare class SubscriptionControllerBase {
    protected readonly service: SubscriptionService;
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder;
    constructor(service: SubscriptionService, rolesBuilder: nestAccessControl.RolesBuilder);
    create(data: SubscriptionCreateInput): Promise<Subscription>;
    findMany(request: Request): Promise<Subscription[]>;
    findOne(params: SubscriptionWhereUniqueInput): Promise<Subscription | null>;
    update(params: SubscriptionWhereUniqueInput, data: SubscriptionUpdateInput): Promise<Subscription | null>;
    delete(params: SubscriptionWhereUniqueInput): Promise<Subscription | null>;
}
