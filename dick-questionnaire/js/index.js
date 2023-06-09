function selectHandler(area) {
  return () => {
    updateAverageScore(area)
    updateOverallScore()
  }
}

function updateAverageScore(area) {
  const displayElement = document.querySelector(`.${area} div.score`)

  let average
  if (displayElement.classList.contains("special-average")) {
    const threshold = parseInt(displayElement.getAttribute("threshold-score"))
    const quorum = parseInt(displayElement.getAttribute("threshold-count"))
    average = specialAverage(area, threshold, quorum)
  } else {
    average = simpleAverage(area)
  }

  displayElement.innerText = average === null ? "Please first select scores" : average
}

function specialAverage(area, threshold, quorum) {
  const allSelectElements = Array.from(document.querySelectorAll(`.${area} select`))
  const importantSelectElements = Array.from(document.querySelectorAll(`.${area} select.important`))
  
  const overThresholdCount = allSelectElements.reduce((prev, curr) => {
    let score = parseInt(curr.value)
    
    if (isNaN(score)) return null
    if (score >= threshold) {
      return prev + 1
    } else {
      return prev
    }
  }, 0)

  const targetElements = overThresholdCount >= quorum ? importantSelectElements : allSelectElements
  let subTotalScore = targetElements.reduce((prev, curr) => {
    if (prev === null) return null
    if (isNaN(curr.value)) return null
    return prev + parseInt(curr.value)
  }, 0)
  if (allSelectElements.some(element => isNaN(element.value))) subTotalScore = null

  return subTotalScore === null ? null : subTotalScore / targetElements.length
}

function simpleAverage(area) {
  const allSelectElements = Array.from(document.querySelectorAll(`.${area} select`))

  const subTotalScore = allSelectElements.reduce((prev, curr) => {
    if (prev === null) return null
    if (isNaN(curr.value)) return null
    return prev + parseInt(curr.value)
  }, 0)

  return subTotalScore === null ? null : subTotalScore / allSelectElements.length
}

function updateOverallScore() {
  const allAreas = [
    "smart-production",
    "smart-process",
    "smart-supply-chain",
    "smart-services",
    "strategy-and-organization",
    "culture-and-mindset"
  ]
  const specialInterestAreas = allAreas.slice(3)
  const specialInterestSum = specialInterestAreas
    .map((area) => {
      return document.querySelector(`tr.${area} div.score`)
    })
    .reduce((prev, curr) => {
      if (prev === null) return null
      if (isNaN(curr.innerText)) return null
      return prev + parseInt(curr.innerText)
    }, 0)

  const areasOfConcern = specialInterestSum >= 7 ? allAreas.slice(0, 3) : allAreas
  const overallScore = areasOfConcern
    .map(area => document.querySelector(`tr.${area} div.score`))
    .reduce((prev, curr) => {
      if (prev === null) return null
      if (isNaN(curr.innerText)) return null
      const currValue = parseInt(curr.innerText)
      if (currValue < prev) {
        return currValue
      } else {
        return prev
      }
    }, 100000)
  
  const totalScoreElement = document.querySelector("tr.total-score div.score")
  totalScoreElement.innerText = overallScore === null ? "Please enter all the scores to see the result!" : overallScore
}