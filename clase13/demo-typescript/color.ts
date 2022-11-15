const getNumber0to255 = ():number => Math.floor(Math.random() * 256);

class Color {
  get():string {
    let color:string = `rgb(${getNumber0to255()}, ${getNumber0to255()}, ${getNumber0to255()})`;
    return color;
  }
}

const color:Color = new Color();

console.log(color.get());