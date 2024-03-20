const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const list = document.querySelector("#list")

btn.addEventListener("click", function() {
    fetch("https://api.disneyapi.dev/character")
    .then((response => response.json()))
    .then((datas => {
        console.log(datas.data)
        const result = datas.data.filter((info) => info.name.toLowerCase().replace(/\s/g, '') === input.value.toLowerCase().replace(/\s/g, ''))
        console.log(result)
    }))
})