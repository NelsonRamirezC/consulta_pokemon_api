const dibujarGrafico = (pokemon) => {

    let stats = pokemon.stats.map(stats => {
        return {label: stats.stat.name, y: stats.base_stat }
    })

    console.log(stats);
    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Simple Column Chart with Index Labels"
        },
          axisY: {
          includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
              indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: stats
            /* dataPoints: [
                { label: 10, y: 71 },
                { label: 20, y: 55 },
                { label: 30, y: 50 },
                { label: 40, y: 65 },
                { label: 50, y: 92 }, //indelabelLabel: "\u2605 Highest"
                { label: 60, y: 68 },
                { label: 70, y: 38 },
                { label: 80, y: 71 },
                { label: 90, y: 54 },
                { label: 100, y: 60 },
                { label: 110, y: 36 },
                { label: 120, y: 49 },
                { label: 130, y: 21 } //indexLabel: "\u2691 Lowest"
            ] */
        }]
    });
    chart.render();
}

class Pokemon{
    constructor(nombre, imagen, stats){
        this.nombre = nombre;
        this.imagen = imagen;
        this.stats = stats;
    }
}

//FUNCIÓN ENCARGA DE CONSULTAR A LA API:

const getPokemon = async (id) =>{
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+ id);
    let data = await response.json()
    return data;

}

const cargarPokemon = (pokemon) => {
    let template = `
    <div class="col">
            <div class="card m-auto" style="width: 15rem;">
            <img src="${pokemon.imagen}" class="card-img-top" alt="${pokemon.nombre}">
            <div class="card-body">
            <h5 class="card-title">${pokemon.nombre}</h5>
            <p class="card-text"><strong>${pokemon.stats[0].stat.name}:</strong> ${pokemon.stats[0].base_stat}</p>
            <p class="card-text"><strong>${pokemon.stats[1].stat.name}:</strong> ${pokemon.stats[1].base_stat}</p>
            <p class="card-text"><strong>${pokemon.stats[2].stat.name}:</strong> ${pokemon.stats[2].base_stat}</p>
            <p class="card-text"><strong>${pokemon.stats[3].stat.name}:</strong> ${pokemon.stats[3].base_stat}</p>
            <p class="card-text"><strong>${pokemon.stats[4].stat.name}:</strong> ${pokemon.stats[4].base_stat}</p>
            <p class="card-text"><strong>${pokemon.stats[5].stat.name}:</strong> ${pokemon.stats[5].base_stat}</p>
            </div>
        </div>
    </div>
    `
    let seccionPokemon = document.querySelector("#mostrar_pokemon .row > div");
    seccionPokemon.innerHTML = template;

}

let formulario = document.getElementById("form_pokemon");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    let pokemon = await getPokemon(nombre.value)
    let objPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.stats);
    cargarPokemon(objPokemon);
    dibujarGrafico(objPokemon);
    
})