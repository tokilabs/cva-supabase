import { Module } from "@nestjs/common";
import { SubscriptionModuleBase } from "./base/Subscription.module.base";
import { SubscriptionService } from "./Subscription.service";
import { SubscriptionController } from "./Subscription.controller";

@Module({
  imports: [SubscriptionModuleBase],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
