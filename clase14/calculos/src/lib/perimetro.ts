export default class Perimetro {
  static cuadrado(lado: number): number {
    return lado * 4;
  }

  static rectangulo(base: number, altura: number): number {
    return base * 2 + altura * 2;
  }

  static circulo(radio: number): number {
    return radio * 2 * Math.PI;
  }

}