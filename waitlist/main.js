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
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
// @ts-ignore
// eslint-disable-next-line
const app_module_1 = require("./app.module");
const swagger_2 = require("./src/swagger");
const { PORT = 54321 } = process.env;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        app.setGlobalPrefix("api");
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            forbidUnknownValues: false,
        }));
        const document = swagger_1.SwaggerModule.createDocument(app, swagger_2.swaggerDocumentOptions);
        /** check if there is Public decorator for each path (action) and its method (findMany / findOne) on each controller */
        Object.values(document.paths).forEach((path) => {
            Object.values(path).forEach((method) => {
                if (Array.isArray(method.security) &&
                    method.security.includes("isPublic")) {
                    method.security = [];
                }
            });
        });
        swagger_1.SwaggerModule.setup(swagger_2.swaggerPath, app, document, swagger_2.swaggerSetupOptions);
        void app.listen(PORT);
        return app;
    });
}
module.exports = main();
