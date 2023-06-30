import * as nestAccessControl from "nest-access-control";
import { SubscriptionService } from "./Subscription.service";
import { SubscriptionControllerBase } from "./base/Subscription.controller.base";
export declare class SubscriptionController extends SubscriptionControllerBase {
    protected readonly service: SubscriptionService;
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder;
    constructor(service: SubscriptionService, rolesBuilder: nestAccessControl.RolesBuilder);
    submitForWaitingList(email: string): Promise<unknown>;
}
