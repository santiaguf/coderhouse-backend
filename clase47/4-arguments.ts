const SayHello = (name: string) => {
    return `Hello ${name}`;
  }

  console.log(SayHello(Deno.args[0]));