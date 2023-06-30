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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const supertest_1 = __importDefault(require("supertest"));
const nest_morgan_1 = require("nest-morgan");
const nest_access_control_1 = require("nest-access-control");
const defaultAuth_guard_1 = require("../../auth/defaultAuth.guard");
const acl_module_1 = require("../../auth/acl.module");
const aclFilterResponse_interceptor_1 = require("../../interceptors/aclFilterResponse.interceptor");
const aclValidateRequest_interceptor_1 = require("../../interceptors/aclValidateRequest.interceptor");
const rxjs_1 = require("rxjs");
const subscription_controller_1 = require("../subscription.controller");
const subscription_service_1 = require("../subscription.service");
const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
    createdAt: new Date(),
    email: "exampleEmail",
    id: "exampleId",
    updatedAt: new Date(),
};
const CREATE_RESULT = {
    createdAt: new Date(),
    email: "exampleEmail",
    id: "exampleId",
    updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
    {
        createdAt: new Date(),
        email: "exampleEmail",
        id: "exampleId",
        updatedAt: new Date(),
    },
];
const FIND_ONE_RESULT = {
    createdAt: new Date(),
    email: "exampleEmail",
    id: "exampleId",
    updatedAt: new Date(),
};
const service = {
    create() {
        return CREATE_RESULT;
    },
    findMany: () => FIND_MANY_RESULT,
    findOne: ({ where }) => {
        switch (where.id) {
            case existingId:
                return FIND_ONE_RESULT;
            case nonExistingId:
                return null;
        }
    },
};
const basicAuthGuard = {
    canActivate: (context) => {
        const argumentHost = context.switchToHttp();
        const request = argumentHost.getRequest();
        request.user = {
            roles: ["user"],
        };
        return true;
    },
};
const acGuard = {
    canActivate: () => {
        return true;
    },
};
const aclFilterResponseInterceptor = {
    intercept: (context, next) => {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            return data;
        }));
    },
};
const aclValidateRequestInterceptor = {
    intercept: (context, next) => {
        return next.handle();
    },
};
describe("Subscription", () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleRef = yield testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: subscription_service_1.SubscriptionService,
                    useValue: service,
                },
            ],
            controllers: [subscription_controller_1.SubscriptionController],
            imports: [nest_morgan_1.MorganModule.forRoot(), acl_module_1.ACLModule],
        })
            .overrideGuard(defaultAuth_guard_1.DefaultAuthGuard)
            .useValue(basicAuthGuard)
            .overrideGuard(nest_access_control_1.ACGuard)
            .useValue(acGuard)
            .overrideInterceptor(aclFilterResponse_interceptor_1.AclFilterResponseInterceptor)
            .useValue(aclFilterResponseInterceptor)
            .overrideInterceptor(aclValidateRequest_interceptor_1.AclValidateRequestInterceptor)
            .useValue(aclValidateRequestInterceptor)
            .compile();
        app = moduleRef.createNestApplication();
        yield app.init();
    }));
    test("POST /subscriptions", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app.getHttpServer())
            .post("/subscriptions")
            .send(CREATE_INPUT)
            .expect(common_1.HttpStatus.CREATED)
            .expect(Object.assign(Object.assign({}, CREATE_RESULT), { createdAt: CREATE_RESULT.createdAt.toISOString(), updatedAt: CREATE_RESULT.updatedAt.toISOString() }));
    }));
    test("GET /subscriptions", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app.getHttpServer())
            .get("/subscriptions")
            .expect(common_1.HttpStatus.OK)
            .expect([
            Object.assign(Object.assign({}, FIND_MANY_RESULT[0]), { createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(), updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString() }),
        ]);
    }));
    test("GET /subscriptions/:id non existing", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app.getHttpServer())
            .get(`${"/subscriptions"}/${nonExistingId}`)
            .expect(common_1.HttpStatus.NOT_FOUND)
            .expect({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
            error: "Not Found",
        });
    }));
    test("GET /subscriptions/:id existing", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app.getHttpServer())
            .get(`${"/subscriptions"}/${existingId}`)
            .expect(common_1.HttpStatus.OK)
            .expect(Object.assign(Object.assign({}, FIND_ONE_RESULT), { createdAt: FIND_ONE_RESULT.createdAt.toISOString(), updatedAt: FIND_ONE_RESULT.updatedAt.toISOString() }));
    }));
    test("POST /subscriptions existing resource", () => __awaiter(void 0, void 0, void 0, function* () {
        let agent = (0, supertest_1.default)(app.getHttpServer());
        yield agent
            .post("/subscriptions")
            .send(CREATE_INPUT)
            .expect(common_1.HttpStatus.CREATED)
            .expect(Object.assign(Object.assign({}, CREATE_RESULT), { createdAt: CREATE_RESULT.createdAt.toISOString(), updatedAt: CREATE_RESULT.updatedAt.toISOString() }))
            .then(function () {
            agent
                .post("/subscriptions")
                .send(CREATE_INPUT)
                .expect(common_1.HttpStatus.CONFLICT)
                .expect({
                statusCode: common_1.HttpStatus.CONFLICT,
            });
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app.close();
    }));
});
