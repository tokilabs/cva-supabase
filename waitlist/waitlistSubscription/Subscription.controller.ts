import * as nestAccessControl from "nest-access-control";
import { SubscriptionService } from "./Subscription.service";
import { SubscriptionControllerBase } from "./base/Subscription.controller.base";
import { Controller, Inject, Post } from "@nestjs/common";

@Controller("Subscribe")
export class SubscriptionController extends SubscriptionControllerBase {
  constructor(
    protected readonly service: SubscriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @Post("subscribeToWaitlist")
  async submitForWaitingList(email: string): Promise<unknown> {
    try {
      const subscribe = await this.service.Login(email);
      return subscribe;
    } catch (error) {
      ("Could not continue the subscription process");
    }
  }
}
