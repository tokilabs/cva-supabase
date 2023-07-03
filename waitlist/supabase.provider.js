"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSession = exports.useSupabase = void 0;
const react_1 = require("react");
const auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
const navigation_1 = require("next/navigation");
const Context = (0, react_1.createContext)(undefined);
function SupabaseProvider({ children, session, }) {
    const supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_, _session) => {
            if ((_session === null || _session === void 0 ? void 0 : _session.access_token) !== (session === null || session === void 0 ? void 0 : session.access_token)) {
                router.refresh();
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase, session]);
}
exports.default = SupabaseProvider;
const useSupabase = () => {
    let context = (0, react_1.useContext)(Context);
    if (context === undefined) {
        throw new Error("useSupabase must be used inside SupabaseProvider");
    }
    return context.supabase;
};
exports.useSupabase = useSupabase;
const useSession = () => {
    let context = (0, react_1.useContext)(Context);
    if (context === undefined) {
        throw new Error("useSession must be used inside SupabaseProvider");
    }
    return context.session;
};
exports.useSession = useSession;
