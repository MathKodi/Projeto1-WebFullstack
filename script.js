const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const list = document.querySelector("#list")
const hidden = document.querySelector(".hidden")

btn.addEventListener("click", function() {   

    if(input.value.replace(/\s/g, '') === ""){
        hidden.innerHTML = "Se você não digitar nada me complica né paizão"
        hidden.className = "not-hidden"
    }
    else{
        fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${input.value}`)
        .then((response => response.json()))
        .then((datas => {
            console.log(datas.data)
            const result = datas.data
            const newLI = document.createElement('li');
            if(result !== undefined){
                if(result.common_locations){
                    for(i = 0; i < result.common_locations.length; i++){
                        newLI.innerHTML = `Lugar comuns para se encontrar: ${result.common_locations}, ` ;
                    }
                }
                if(result.description){
                    newLI.innerHTML = newLI.innerHTML + `Descrição: ${result.description},` ;
                }
                if(result.drops){
                    newLI.innerHTML = newLI.innerHTML + ` Drops: ${result.drops},` ;
                }
                if(result.name !== undefined){
                    newLI.innerHTML = newLI.innerHTML + ` Nome: ${result.name}`
                    list.appendChild(newLI);
                    hidden.className = "hidden"
                }
                if(result.image){
                    const image = document.createElement("img");
                    image.src = result.image
                    list.appendChild(image)
                }
            }
        }))
    } 
})