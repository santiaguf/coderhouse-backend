class Contador {
  static cuentaGlobal = 0

  constructor(responsable){
    this.cuentaIndividual = 0;
    this.responsable = responsable;
  }

  obtenerResponsable() {
    return this.responsable;
  }

  definirResponsable(responsable){
    this.responsable = responsable;
  }

  obtenerCuentaIndividual() {
    return this.cuentaIndividual;
  }

  obtenerCuentaGlobal() {
    return Contador.cuentaGlobal;
  }

  contar() {
    this.cuentaIndividual++
    Contador.cuentaGlobal++
  }

}

const cuentasDeSanti = new Contador("Santi");

const cuentasDeCesar = new Contador("Cesar");

cuentasDeSanti.contar();
cuentasDeCesar.contar();

cuentasDeCesar.contar();
cuentasDeCesar.contar();
cuentasDeCesar.contar();

console.log(cuentasDeSanti);
console.log(cuentasDeCesar);

//console.log(cuentasDeSanti.obtenerResponsable());

cuentasDeSanti.definirResponsable("Santiago");

console.log(cuentasDeSanti.obtenerCuentaGlobal());//console.log(cuentasDeSanti.obtenerResponsable());

