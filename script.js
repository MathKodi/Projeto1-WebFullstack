const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const list = document.querySelector("#list")
const hidden = document.querySelector(".hidden")
var indice = 0
var array = []

btn.addEventListener("click", function() {   
    if(input.value.replace(/\s/g, '') === ""){
        hidden.innerHTML = "Se você não digitar nada me complica né paizão"
        hidden.className = "not-hidden"
    }
    else{
        hidden.className = "hidden"
        fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${input.value}`)
        .then((response => {
            if(response.status == 200){
                return response.json()
            }
            else{
                throw new Error("Deu ruim")
            }
        }))
        .then((datas => {
            console.log(datas.data)
            const result = datas.data
            var flag = true
            array.forEach((nome) => {
                if(nome == result.name){
                    flag = false
                }
            })
            array[indice] = result.name
            const newLI = document.createElement('li');
            console.log(array) 
            if(result !== undefined && flag !== false){
                if(result.common_locations){
                    newLI.innerHTML = `Lugar comuns para se encontrar: ${result.common_locations} <br>` ;                    
                }
                if(result.description){
                    newLI.innerHTML = newLI.innerHTML + `Descrição: ${result.description} <br>` ;
                }
                if(result.drops !== null && result.drops !== undefined && result.drops.length > 0){
                    newLI.innerHTML = newLI.innerHTML + ` Drops: ${result.drops} <br>` ;
                }
                if(result.name !== undefined){
                    newLI.innerHTML = newLI.innerHTML + ` Nome: ${result.name} <br>`
                    list.appendChild(newLI);
                    hidden.className = "hidden"
                }
                if(result.image){
                    const image = document.createElement("img");
                    image.src = result.image
                    list.appendChild(image)
                }
                indice++;
            } else if(flag === false){
                hidden.innerHTML = "Essa entidade já foi pesquisada! Da um visu aí mano."
                hidden.className = "not-hidden"
            }
        }))
        .catch((error) => {
            console.log(error)
            hidden.innerHTML = "Digite um número entre 1 e 389 ou um nome de uma entidade existente"
            hidden.className = "not-hidden"
        })
    } 
})