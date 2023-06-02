function selectHandler(area) {
  const func = () => {
    selectElements = Array.from(document.querySelectorAll(`.${area} select`))
    displayElement = document.querySelector(`.${area} div.score`)

    totalScore = selectElements.reduce((prev, curr) => {
      if (prev === null) return null
      if (curr.value === "Select") return null
      return prev + parseInt(curr.value)
    }, 0)

    displayElement.innerText = totalScore === null ? "Please first select scores" : totalScore
  }
  return func
}
