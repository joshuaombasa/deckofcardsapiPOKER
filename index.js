const newDeckBtn = document.getElementById("new-deck-btn")
const drawBtn = document.getElementById("draw-btn")
const remainingCards = document.getElementById("remaining-cards")
let computerWinsCount = 0
let yourWinsCount = 0

let deckId

newDeckBtn.addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            console.log(data.deck_id)
        })
})


drawBtn.addEventListener("click", () => {
    console.log(deckId)
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            console.log(data.remaining)
            document.getElementById("card-1").innerHTML = `<img class="card-img" src=${data.cards[0].image} />`
            document.getElementById("card-2").innerHTML = `<img class="card-img" src=${data.cards[1].image} />`

            determineCardWinner(data.cards[0].value, data.cards[1].value)

            remainingCards.textContent = `Remaining Cards: ${data.remaining}`

            drawBtn.disabled = data.remaining === 0 ? true : false

        }
        )
})


function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const indexOfCard1 = valueOptions.indexOf(card1)
    const indexOfCard2 = valueOptions.indexOf(card2)

    let winningMessage 

    if (indexOfCard1 > indexOfCard2) {
        winningMessage = "Computer wins the gam"
        computerWinsCount ++
    } else if (indexOfCard1 < indexOfCard2) {
        yourWinsCount ++
        winningMessage = "You win the game"
    } else {
        winningMessage = "War!"
    }

    document.getElementById("your-score").textContent = `Your score: ${yourWinsCount}`
    document.getElementById("computer-score").textContent = `Computer score: ${computerWinsCount}`

    document.getElementById("game-winner-text").textContent = winningMessage
    console.log(winningMessage)

}