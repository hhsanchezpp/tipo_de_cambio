const la_api = 'https://mindicador.cl/api';
const pesos_chile = document.getElementById('pesos_chile');
const calculo = document.getElementById('procesar_calculo');
const resultado = document.getElementById('resultado');

fetch(la_api).then(lectura_api => lectura_api.json()).then(lectura_api=> {
    const invalidValues = ['tasa_desempleo', 'libra_cobre', 'dolar_intercambio','version', 'autor', 'fecha',];
    const arreglo_tipo_de_cambios = [];
    for (const i in lectura_api) {
        if (!invalidValues.includes(i)) {
            arreglo_tipo_de_cambios.push({
                nombre: lectura_api[i].nombre,
                valor: lectura_api[i].valor,
                codigo: lectura_api[i].codigo,
                unidad_medida: lectura_api[i].unidad_medida,
                fecha: lectura_api[i].fecha
            });
        }
        const opciones_seleccion = 
                            arreglo_tipo_de_cambios.map((moneda) => `<option value="${moneda.codigo}">${moneda.nombre}</option>`);
        document.getElementById('tipodecambio').innerHTML = opciones_seleccion.join('');
        calculo.addEventListener('click', () => {
            resultado.innerHTML = 
                            (pesos_chile.value / lectura_api[document.getElementById('tipodecambio').value].valor).toFixed(2);
        });
    }
});
