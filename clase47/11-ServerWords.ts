import { serve, ServerRequest } from "https://deno.land/std@0.100.0/http/server.ts";

const port = 8080;

const server = serve({ port });

console.log(`Server running on port ${port}`);

function habdleRequest(req: ServerRequest) {
    const phrase = extractWords(req);
    const reversedPhrase = phrase.split(" ").reverse().join(" ");

    req.respond({
        status: 200,
        headers: new Headers({ "content-type": "text/html; charset=utf-8" }),
        body: reversedPhrase
    });
}

function extractWords(req: ServerRequest) {
    const query = req.url.replace(/\//g, "");
    const params = new URLSearchParams(query);
    let phrase = params.get("frase");

    if (phrase) {
        phrase = decodeURIComponent(phrase);
    }
    return phrase ?? "";
}

for await (const req of server) {
    habdleRequest(req);
}