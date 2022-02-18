"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const fs_1 = require("fs");
const router_1 = __importDefault(require("@koa/router"));
const koa_req_validation_1 = require("koa-req-validation");
const generator_1 = __importDefault(require("./generator"));
const app = new koa_1.default();
const router = new router_1.default();
router.get('/', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = (0, fs_1.createReadStream)('./docs/site_docs.html');
});
router.get('/pwd', (0, koa_req_validation_1.query)("uppercase")
    .isAlphanumeric()
    .withMessage("required")
    .isIn(["true", "false"])
    .withMessage("Invalid value passed")
    .build(), (0, koa_req_validation_1.query)("numbers")
    .isAlphanumeric()
    .withMessage("required")
    .isIn(["true", "false"])
    .withMessage("Invalid value passed")
    .build(), (0, koa_req_validation_1.query)("symbol")
    .isAlphanumeric()
    .withMessage("required")
    .isIn(["true", "false"])
    .withMessage("Invalid value passed")
    .build(), (0, koa_req_validation_1.query)("len")
    .isNumeric()
    .withMessage("required")
    .isInt({ min: 8, max: 100 })
    .withMessage("Invalid value passed")
    .build(), (ctx) => {
    const errors = (0, koa_req_validation_1.validationResults)(ctx);
    if (errors.hasErrors()) { // if there are errors
        ctx.status = 400;
        ctx.body = {
            errors: errors.array()
        };
    }
    else {
        ctx.body = {
            Message: "Request Successfull",
            status: 200,
            result: (0, generator_1.default)(ctx.query.uppercase, ctx.query.symbol, ctx.query.numbers, ctx.query.len)
        };
    }
});
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=index.js.map