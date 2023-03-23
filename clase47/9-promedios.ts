import { bgWhite, green, red, yellow } from 'https://deno.land/std/fmt/colors.ts';

const numbers = Deno.args.map(num => Number(num));

numbers.sort((a, b) => a - b);

const min = numbers[0];
const max = numbers[numbers.length - 1];

const average = () => {
    let sum = 0;
    numbers.forEach(num => sum += num);
    return sum / numbers.length;
};

const text: String[] = [];

text.push('**********************');
text.push(`*** Números ordenados: ${numbers}`);
text.push(`*** Mínimo: ${min}`);
text.push(`*** Máximo: ${max}`);
text.push(`*** Promedio: ${average()}`);
text.push('**********************');

console.log(text[0]);
console.log(text[1]);
console.log(bgWhite(yellow(text[2])));
console.log(bgWhite(red(text[3])));
console.log(bgWhite(green(text[4])));
console.log(text[5]);

await Deno.writeTextFile('resultados.dat', text.join('\n'));