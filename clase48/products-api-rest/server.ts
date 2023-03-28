import { Application, config } from "./deps.ts";

import { router } from "./routes/products.routes.ts";
import { logger } from "./middlewares/logger.middleware.ts";

const { PORT } = config();
const app = new Application();

app.use(logger);
app.use(router.routes());

console.log(`Server running on port ${PORT}`);

await app.listen({ port: PORT });