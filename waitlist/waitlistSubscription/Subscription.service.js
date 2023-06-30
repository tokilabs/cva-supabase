"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const Subscription_service_base_1 = require("./base/Subscription.service.base");
const auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
const auth_helpers_nextjs_2 = require("@supabase/auth-helpers-nextjs");
const cache_1 = require("next/cache");
const headers_1 = require("next/headers");
let SubscriptionService = class SubscriptionService extends Subscription_service_base_1.SubscriptionServiceBase {
    constructor(supabase) {
        super(supabase);
        this.supabase = supabase;
    }
    listSubscribedEmails(email) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const handleSubscription = (formData) => __awaiter(this, void 0, void 0, function* () {
                "use server";
                const email = String(formData.get("email"));
                const password = String(formData.get("password"));
                const supabase = (0, auth_helpers_nextjs_2.createServerActionClient)({ cookies: headers_1.cookies });
                yield supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: "http://localhost:3000/auth/callback",
                    },
                });
                (0, cache_1.revalidatePath)("/");
            });
            const handleSignIn = (formData) => __awaiter(this, void 0, void 0, function* () {
                "use server";
                const email = String(formData.get("email"));
                const password = String(formData.get("password"));
                const supabase = (0, auth_helpers_nextjs_2.createServerActionClient)({ cookies: headers_1.cookies });
                yield supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                (0, cache_1.revalidatePath)("/");
            });
        });
    }
};
SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_helpers_nextjs_1.SupabaseClient])
], SubscriptionService);
exports.SubscriptionService = SubscriptionService;
