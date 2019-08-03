exports.tally = function (votes) {
  function countVotes () {
    const VOTE = 1
    const counts = {}

    for (let i = 0; i < votes.length; i++) {
      const candidate = votes[i]
      const amount = counts[candidate]
      counts[candidate] = amount ? amount + VOTE : VOTE
    };

    return counts
  }

  function convertCountsToArray (counts) {
    return Object.values(counts)
  }

  function sortVotesInDescendingOrder (numberOfVotes) {
    return numberOfVotes.sort(function (a, b) { return b - a })
  }

  const counts = countVotes()
  const numberOfVotes = sortVotesInDescendingOrder(convertCountsToArray(counts))
  const majorityScore = Math.floor(votes.length / 2)
  const isWinnerReachesMajorityOfVotes = numberOfVotes[0] >= majorityScore

  function getMajorityWinner () {
    for (const key in counts) {
      if (counts[key] === numberOfVotes[0]) {
        return [Number(key)]
      }
    }
  }

  function getWinners () {
    const winners = []
    const firstThreePositions = numberOfVotes.slice(0, 3)
    for (const key in counts) {
      const value = counts[key]
      const isWinner = firstThreePositions.includes(value)
      if (isWinner) {
        winners.push(Number(key))
      }
    };
    return winners
  }

  if (isWinnerReachesMajorityOfVotes) {
    return getMajorityWinner()
  }

  return getWinners()
}
