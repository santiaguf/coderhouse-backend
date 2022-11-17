export const getTime = () => {
  return {
    fhy: new Date().toLocaleString(),
    timestamp: Date.now(),
    saludo: `hola cómo estás?`
  };
};