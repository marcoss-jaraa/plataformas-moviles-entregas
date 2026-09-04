const contenedor = document.getElementById("pokemon-container");
const spinner = document.getElementById("spinner");
const botonCargarMas = document.getElementById("btn-cargar-mas");
const modalBody = document.getElementById("modal-body");

let offset = 0;
const cantidadInicial = 151;
const cantidadExtra = 50;
const cachePokemon = new Map();

async function obtenerPokemon(cantidad) {
    spinner.classList.remove("d-none");
    botonCargarMas.disabled = true;

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${offset}`);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la lista de Pokémon");
        }

        const datos = await respuesta.json();

        const detalles = await Promise.all(
            datos.results.map((pokemon) => obtenerDetallePokemon(pokemon.url))
        );

        detalles.forEach((pokemon) => mostrarPokemon(pokemon));

        offset += datos.results.length;

        if (!datos.next) {
            botonCargarMas.classList.add("d-none");
        }
    } catch (error) {
        contenedor.innerHTML += `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    Ocurrió un error al cargar los Pokémon.
                </div>
            </div>
        `;

        console.log(error);
    } finally {
        spinner.classList.add("d-none");
        botonCargarMas.disabled = false;
    }
}

async function obtenerDetallePokemon(url) {
    if (cachePokemon.has(url)) {
        return cachePokemon.get(url);
    }

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener el detalle del Pokémon");
    }

    const pokemon = await respuesta.json();

    cachePokemon.set(url, pokemon);

    return pokemon;
}

function mostrarPokemon(pokemon) {
    const nombre = capitalizar(pokemon.name);

    const imagen =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;

    const tipos = pokemon.types
        .map((tipo) => {
            return `
                <span class="tipo tipo-${tipo.type.name}">
                    ${capitalizar(tipo.type.name)}
                </span>
            `;
        })
        .join("");

    const columna = document.createElement("div");

    columna.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    columna.innerHTML = `
        <div class="card pokemon-card shadow-sm">
            <div class="card-body text-center d-flex flex-column">

                <p class="pokemon-number mb-1">
                    #${String(pokemon.id).padStart(3, "0")}
                </p>

                <img
                    src="${imagen}"
                    class="pokemon-img"
                    alt="${nombre}"
                >

                <h2 class="h5 fw-bold mt-2">
                    ${nombre}
                </h2>

                <div class="mb-3">
                    ${tipos}
                </div>

                <button
                    class="btn btn-outline-danger mt-auto"
                    data-id="${pokemon.id}"
                >
                    Ver más información
                </button>

            </div>
        </div>
    `;

    const boton = columna.querySelector("button");

    boton.addEventListener("click", () => {
        mostrarInformacion(pokemon);
    });

    contenedor.appendChild(columna);
}

function mostrarInformacion(pokemon) {
    const nombre = capitalizar(pokemon.name);

    const imagen =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;

    let habilidad = "Sin información";

    if (pokemon.abilities.length > 0) {
        habilidad = capitalizar(
            pokemon.abilities[0].ability.name
        );
    }

    const tipos = pokemon.types
        .map((tipo) => {
            return `
                <span class="tipo tipo-${tipo.type.name}">
                    ${capitalizar(tipo.type.name)}
                </span>
            `;
        })
        .join("");

    const movimientos = pokemon.moves
        .slice(0, 4)
        .map((movimiento) => {
            return `
                <li>
                    ${capitalizar(movimiento.move.name)}
                </li>
            `;
        })
        .join("");

    modalBody.innerHTML = `
        <img
            src="${imagen}"
            class="modal-pokemon-img"
            alt="${nombre}"
        >

        <h3 class="text-center fw-bold">
            ${nombre}
        </h3>

        <p class="text-center text-muted">
            Pokémon #${String(pokemon.id).padStart(3, "0")}
        </p>

        <div class="mb-3">
            <strong>Tipos:</strong>

            <div class="mt-1">
                ${tipos}
            </div>
        </div>

        <p>
            <strong>Habilidad:</strong>
            ${habilidad}
        </p>

        <div>
            <strong>Movimientos:</strong>

            <ul class="movimientos-lista mt-2">
                ${movimientos}
            </ul>
        </div>
    `;

    const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("pokemonModal")
    );

    modal.show();
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() +
        texto.slice(1).replaceAll("-", " ");
}

botonCargarMas.addEventListener("click", () => {
    obtenerPokemon(cantidadExtra);
});

obtenerPokemon(cantidadInicial);