// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@16.13.1";
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";

import { serve } from "https://deno.land/std@0.106.0/http/mod.ts";

const port = 8080;

const server = serve({ port });


(async () => {
    for await (const req of server) {

        const phrase = extractWords(req.url);
        const reversedPhrase = phrase.split(" ").reverse().join(" ");

        await req.respond({
            status: 200,
            headers: new Headers({
                "content-type": "text/html; charset=utf-8",
            }),
            body: ReactDOMServer.renderToString(
                <html>
                    <head>
                        <meta charSet="utf-8" />
                        <title>Server words</title>
                    </head>
                    <body>
                        {req.url}
                        <br />
                        {phrase}
                        <br />
                        {reversedPhrase}
                    </body>
                </html>,
            ),
        })
    }
})()


function extractWords(req: String) {
    const query = req.replace(/\//g, "");
    const params = new URLSearchParams(query);
    let phrase = params.get("frase");

    if (phrase) {
        phrase = decodeURIComponent(phrase);
    }
    return phrase ?? "";
}

console.log(`Server running on port ${port}`);