const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const list = document.querySelector("#list")
const hidden = document.querySelector(".hidden")

btn.addEventListener("click", function() {

    fetch("https://api.disneyapi.dev/character")
    .then((response => response.json()))
    .then((datas => {
        console.log(datas.data)
        const result = datas.data.filter((info) => info.name.toLowerCase().replace(/\s/g, '') === input.value.toLowerCase().replace(/\s/g, ''))
        const newLI = document.createElement('li');
        if(result[0] !== undefined){
            if(result[0].tvShows.length > 0){
                newLI.innerHTML = `TvShows: ${result[0].tvShows}, ` ;
            }
            if(result[0].films.length > 0){
                newLI.innerHTML = newLI.innerHTML + `Filmes: ${result[0].films},` ;
            }
            if(result[0].videoGames.length > 0){
                newLI.innerHTML = newLI.innerHTML + ` Jogos: ${result[0].videoGames},` ;
            }
            newLI.innerHTML = newLI.innerHTML + ` Personagem: ${result[0].name}`
            list.appendChild(newLI);
            hidden.className = "hidden"
        }
        else if(input.value.replace(/\s/g, '') === ""){
            hidden.innerHTML = "Se você não digitar nada me complica né paizão"
            hidden.className = "not-hidden"
        }
        else if(result[0] === undefined) {
            hidden.innerHTML = "Sua pesquisa não achou nada migão, digita algo existente ai pae"
            hidden.className = "not-hidden"
        }
        
    }))
})