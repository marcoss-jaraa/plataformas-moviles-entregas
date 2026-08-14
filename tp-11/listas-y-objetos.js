var listaPersonasEjemplo = [
    {
        "apellido": "Perez",
        "nombre": "Juan",
        "edad": 20,
        "documento": 12345
    },
    {
        "apellido": "Lopez",
        "nombre": "Luis",
        "edad": 20,
        "documento": 23456
    },
    {
        "apellido": "Zapata",
        "nombre": "Pablo",
        "edad": 10,
        "documento": 34567
    },
    {
        "apellido": "Acuña",
        "nombre": "Ana",
        "edad": 30,
        "documento": 45678
    },
];

/**
 * 01 - ordenarPorApellido
 */
function ordenarPorApellido(listaDePersonas) {
    var listaOrdenada = listaDePersonas.slice();

    listaOrdenada.sort(function(persona1, persona2) {
        if (persona1.apellido < persona2.apellido) {
            return -1;
        }

        if (persona1.apellido > persona2.apellido) {
            return 1;
        }

        return 0;
    });

    return listaOrdenada;
}
console.log("ordenarPorApellido()", ordenarPorApellido(listaPersonasEjemplo));

/**
 * 02 - soloNombres
 */
function soloNombres(listaDePersonas) {
    var nombres = [];

    for (var i = 0; i < listaDePersonas.length; i++) {
        nombres.push(listaDePersonas[i].nombre);
    }

    return nombres;
}
console.log("soloNombres()", soloNombres(listaPersonasEjemplo));

/**
 * 03 - promedioEdades
 */
function promedioEdades(listaDePersonas) {
    if (listaDePersonas.length === 0) {
        return 0;
    }

    var sumaEdades = 0;

    for (var i = 0; i < listaDePersonas.length; i++) {
        sumaEdades = sumaEdades + listaDePersonas[i].edad;
    }

    return sumaEdades / listaDePersonas.length;
}
console.log("promedioEdades()", promedioEdades(listaPersonasEjemplo));

/**
 * 04 - cumplirAños
 */
function cumplirAños(listaDePersonas) {
    var nuevaLista = [];

    for (var i = 0; i < listaDePersonas.length; i++) {
        var persona = {
            apellido: listaDePersonas[i].apellido,
            nombre: listaDePersonas[i].nombre,
            edad: listaDePersonas[i].edad + 1,
            documento: listaDePersonas[i].documento
        };

        nuevaLista.push(persona);
    }

    return nuevaLista;
}
console.log("cumplirAños()", cumplirAños(listaPersonasEjemplo));

/**
 * 05 - soloMayoresDeEdad
 */
function soloMayoresDeEdad(listaDePersonas) {
    var mayores = [];

    for (var i = 0; i < listaDePersonas.length; i++) {
        if (listaDePersonas[i].edad > 18) {
            mayores.push(listaDePersonas[i]);
        }
    }

    return mayores;
}
console.log("soloMayoresDeEdad()", soloMayoresDeEdad(listaPersonasEjemplo));

/**
 * 06 - laPersonaMayor
 */
function laPersonaMayor(listaDePersonas) {
    var personaMayor = listaDePersonas[0];

    for (var i = 1; i < listaDePersonas.length; i++) {
        if (listaDePersonas[i].edad > personaMayor.edad) {
            personaMayor = listaDePersonas[i];
        }
    }

    return personaMayor;
}
console.log("laPersonaMayor()", laPersonaMayor(listaPersonasEjemplo));

/**
 * 07 - agregarHeladoFavorito
 */
function agregarHeladoFavorito(listaDePersonas, listaDeHelados) {
    var nuevaLista = [];

    for (var i = 0; i < listaDePersonas.length; i++) {
        var persona = {
            apellido: listaDePersonas[i].apellido,
            nombre: listaDePersonas[i].nombre,
            edad: listaDePersonas[i].edad,
            documento: listaDePersonas[i].documento
        };

        if (i < listaDeHelados.length) {
            persona.heladoFavorito = listaDeHelados[i];
        } else {
            persona.heladoFavorito = "vainilla";
        }

        nuevaLista.push(persona);
    }

    return nuevaLista;
}
console.log("agregarHeladoFavorito()", agregarHeladoFavorito(listaPersonasEjemplo, ["chocolate", "limon", "frutilla"]));