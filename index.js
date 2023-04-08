const newDeckBtn = document.getElementById("new-deck-btn")

const drawBtn = document.getElementById("draw-btn")

let deckId

newDeckBtn.addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            console.log(data.deck_id)
        })
})


drawBtn.addEventListener("click", () => {
    console.log(deckId)
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            console.log(data.cards[0].image)
            document.getElementById("card-1").innerHTML = `<img class="card-img" src=${data.cards[0].image} />`
            document.getElementById("card-2").innerHTML = `<img class="card-img" src=${data.cards[1].image} />`
        }
        )
})
