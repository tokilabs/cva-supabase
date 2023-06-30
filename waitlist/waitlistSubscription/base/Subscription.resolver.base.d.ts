import { MetaQueryPayload } from "../../src/util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import { CreateSubscriptionArgs } from "./CreateSubscriptionArgs";
import { UpdateSubscriptionArgs } from "./UpdateSubscriptionArgs";
import { DeleteSubscriptionArgs } from "./DeleteSubscriptionArgs";
import { SubscriptionCountArgs } from "./SubscriptionCountArgs";
import { SubscriptionFindManyArgs } from "./SubscriptionFindManyArgs";
import { SubscriptionFindUniqueArgs } from "./SubscriptionFindUniqueArgs";
import { Subscription } from "./Subscription";
import { SubscriptionService } from "../Subscription.service";
export declare class SubscriptionResolverBase {
    protected readonly service: SubscriptionService;
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder;
    constructor(service: SubscriptionService, rolesBuilder: nestAccessControl.RolesBuilder);
    _subscriptionsMeta(args: SubscriptionCountArgs): Promise<MetaQueryPayload>;
    subscriptions(args: SubscriptionFindManyArgs): Promise<Subscription[]>;
    subscription(args: SubscriptionFindUniqueArgs): Promise<Subscription | null>;
    createSubscription(args: CreateSubscriptionArgs): Promise<Subscription>;
    updateSubscription(args: UpdateSubscriptionArgs): Promise<Subscription | null>;
    deleteSubscription(args: DeleteSubscriptionArgs): Promise<Subscription | null>;
}
