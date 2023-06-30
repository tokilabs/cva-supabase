import { Injectable } from "@nestjs/common";
import { SubscriptionServiceBase } from "./base/Subscription.service.base";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import supabase from "../../app";
import { empty } from "@prisma/client/runtime";

@Injectable()
export class SubscriptionService extends SubscriptionServiceBase {
  constructor(protected readonly supabase: SupabaseClient) {
    super(supabase);
  }

  async listSubscribedEmails(email: string[]) {}
  async subscribeToWaitlist(email: string) {
    if (empty) {
      return await supabase.storage.createBucket(email);
    } else {
      return supabase.storage.updateBucket(email, {
        public: false,
      });
    }
  }
}
