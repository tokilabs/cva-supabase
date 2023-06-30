import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SubscriptionService } from "./Subscription.service";
import { SubscriptionControllerBase } from "./base/Subscription.controller.base";
import { Post } from "@nestjs/common";
import { Subscription } from "./base/Subscription";
import { SubscriptionServiceBase } from "./base/Subscription.service.base"
import { SubscriptionFindUniqueArgs } from "./base/SubscriptionFindUniqueArgs";

@swagger.ApiTags("subscriptions")
@common.Controller("subscriptions")
export class SubscriptionController extends SubscriptionControllerBase {
  constructor(
    protected readonly service: SubscriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @Post("subscribeToWaitlist")
  async submitForWaitingList(email: SubscriptionFindUniqueArgs){
      this.service.subscribeToWaitlist(email)
    }
  }

