import Koa from 'koa';
import { createReadStream, ReadStream } from 'fs';
import Router from '@koa/router';
import cors from 'koa2-cors';
import { query, validationResults } from 'koa-req-validation';
import generatePassword from './generator';
const app = new Koa();
const router = new Router();
app.use(cors());
router.get('/', (ctx: { type: string; body: ReadStream; }) => {
    ctx.type = 'html';
    ctx.body = createReadStream('./docs/site_docs.html');
});

router.get('/pwd',
    query("uppercase")
        .isAlphanumeric()
        .withMessage("required")
        .isIn(["true", "false"])
        .withMessage("Invalid value passed")
        .build(),
    query("numbers")
        .isAlphanumeric()
        .withMessage("required")
        .isIn(["true", "false"])
        .withMessage("Invalid value passed")
        .build(),
    query("symbol")
        .isAlphanumeric()
        .withMessage("required")
        .isIn(["true", "false"])
        .withMessage("Invalid value passed")
        .build(),
    query("len")
        .isNumeric()
        .withMessage("required")
        .isInt({ min: 8, max: 100 })
        .withMessage("Invalid value passed")
        .build(),
    async (ctx: Router.RouterContext<Koa.DefaultState, Koa.DefaultContext>) => {
        const errors = validationResults(ctx);
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
                result: generatePassword(
                    ctx.query.uppercase,
                    ctx.query.symbol,
                    ctx.query.numbers,
                    ctx.query.len
                )
            };
        }
    });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);