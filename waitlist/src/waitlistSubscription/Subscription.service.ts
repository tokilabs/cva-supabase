import { Injectable } from "@nestjs/common";
import { SubscriptionServiceBase } from "./base/Subscription.service.base";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import supabase from "./app";
import { SubscriptionFindUniqueArgs } from "./base/SubscriptionFindUniqueArgs";

@Injectable()
export class SubscriptionService extends SubscriptionServiceBase {
  constructor(protected readonly supabase: SupabaseClient) {
    super(supabase);
  }

  async subscribeToWaitlist(email: SubscriptionFindUniqueArgs){
     let { data, error } = await supabase.auth.signUp({
        email: 'someone@email.com',
        password: 'YqVGZWaoTJtfzUchYSYQ'
      })
      return { data, error }
  }
}
