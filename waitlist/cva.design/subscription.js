// @ts-nocheck

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function Login(email, password) {
  const handleSubscription = async (formData) => {
    "use server";
    const email = String(formData.get("email"));
    const supabase = createServerActionClient({ cookies });
    // await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: "",
    //   },
    // });

    revalidatePath("/");
    return supabase;
  };

  const handleSignIn = async (formData) => {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    revalidatePath("/");
  };
}
