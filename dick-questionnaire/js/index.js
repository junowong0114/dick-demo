function selectHandler(area) {
  return () => {
    updateSubTotalScore(area)
    updateTotalScore()
  }
}

function updateSubTotalScore(area) {
  selectElements = Array.from(document.querySelectorAll(`.${area} select`))
  displayElement = document.querySelector(`.${area} div.score`)

  subTotalScore = selectElements.reduce((prev, curr) => {
    if (prev === null) return null
    if (curr.value === "Select") return null
    return prev + parseInt(curr.value)
  }, 0)

  displayElement.innerText = subTotalScore === null ? "Please first select scores" : subTotalScore
}

function updateTotalScore() {
  totalScores = Array
    .from(document.querySelectorAll(`select`))
    .reduce((prev, curr) => {
      if (prev === null) return null
      if (curr.value === "Select") return null
      return prev + parseInt(curr.value)
    }, 0)
  
  totalScoreElement = document.querySelector("tr.total-score div.score")
  totalScoreElement.innerText = totalScores === null ? "Please enter all the scores to see the result!" : totalScores
}