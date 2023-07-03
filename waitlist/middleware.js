"use strict";
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
exports.config = exports.middleware = void 0;
const auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
const server_1 = require("next/server");
function middleware(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = server_1.NextResponse.next();
        const supabase = (0, auth_helpers_nextjs_1.createMiddlewareClient)({ req, res });
        const { data: { user }, } = yield supabase.auth.getUser();
        // if user is signed in and the current path is / redirect the user to /account
        if (user && req.nextUrl.pathname === '/') {
            return server_1.NextResponse.redirect(new URL('/account', req.url));
        }
        // if user is not signed in and the current path is not / redirect the user to /
        if (!user && req.nextUrl.pathname !== '/') {
            return server_1.NextResponse.redirect(new URL('/', req.url));
        }
        return res;
    });
}
exports.middleware = middleware;
exports.config = {
    matcher: ['/', '/account'],
};
