/// <reference types="react" />
import { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
declare type MaybeSession = Session | null;
export default function SupabaseProvider({ children, session, }: {
    children: React.ReactNode;
    session: MaybeSession;
}): void;
export declare const useSupabase: <Database_1 = any, SchemaName extends string & keyof Database_1 = "public" extends keyof Database_1 ? "public" : string & keyof Database_1>() => SupabaseClient<Database_1, SchemaName, Database_1[SchemaName] extends import("@supabase/supabase-js/dist/module/lib/types").GenericSchema ? Database_1[SchemaName] : any>;
export declare const useSession: () => MaybeSession;
export {};
