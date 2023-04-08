const newDeckBtn = document.getElementById("new-deck-btn")

const drawBtn = document.getElementById("draw-btn")

let deckId 

newDeckBtn.addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",{method: "GET"})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        
      })
})