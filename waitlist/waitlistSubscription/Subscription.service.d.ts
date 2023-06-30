import { SubscriptionServiceBase } from "./base/Subscription.service.base";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
export declare class SubscriptionService extends SubscriptionServiceBase {
    protected readonly supabase: SupabaseClient;
    constructor(supabase: SupabaseClient);
    listSubscribedEmails(email: string[]): Promise<void>;
    Login(email: string, password?: string): Promise<void>;
}
