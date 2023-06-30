import { Injectable } from "@nestjs/common";
import { SubscriptionServiceBase } from "./base/Subscription.service.base";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import supabase from "../../supabase/app";
import { empty } from "@prisma/client/runtime";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { Database } from "../database.types";

@Injectable()
export class SubscriptionService extends SubscriptionServiceBase {
  constructor(protected readonly supabase: SupabaseClient) {
    super(supabase);
  }

  async listSubscribedEmails(email: string[]) {}

  async Login(email: string, password?: string) {
    const handleSubscription = async (formData: FormData) => {
      "use server";
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));

      const supabase = createServerActionClient<Database>({ cookies });
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "",
        },
      });

      revalidatePath("/");
    };

    const handleSignIn = async (formData: FormData) => {
      "use server";
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));

      const supabase = createServerActionClient<Database>({ cookies });
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      revalidatePath("/");
    };
  }
}
