export default class Superficie {
  static cuadrado(lado: number): number {
    return lado * lado;
  }

  static rectangulo(base: number, altura: number): number {
    return base * altura;
  }

  static circulo(radio: number): number {
    return radio * radio * Math.PI;
  }
}