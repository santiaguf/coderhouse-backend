// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@16.13.1";
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";

import { serve } from "https://deno.land/std@0.106.0/http/mod.ts";

const port = 8080;

let visits = 0;

const server = serve({ port });

(async () => {
    for await (const req of server) {
        await req.respond({
            status: 200,
            headers: new Headers({
                "content-type": "text/html; charset=utf-8",
            }),
            body: ReactDOMServer.renderToString(
                <html>
                    <head>
                        <meta charSet="utf-8" />
                        <title>Server Visit</title>
                    </head>
                    <body>
                        <h1 sytle={{ color: "red" }}>Server Visit with React</h1>
                        <h2 style={{ color: "brown"}}>Visitas: {++visits} </h2>
                        <h3 style={{ color: "purple"}}>FyH: {new Date().toLocaleString()}</h3>
                    </body>
                </html>,
            ),
        })
    }
})()

console.log(`Server running on port ${port}`);