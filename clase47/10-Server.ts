import { serve } from "https://deno.land/std@0.106.0/http/mod.ts"

const port = Number(Deno.env.get("PORT")) || 8080;

const servidor = serve({ port });

for await (const req of servidor) {
  req.respond({ body: JSON.stringify({ message: "Hello World" }) });
}

console.log(`Server running on port ${port}`);