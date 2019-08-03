function countVotes (votes) {
  const VOTE = 1
  const counts = {}

  for (let i = 0; i < votes.length; i++) {
    const candidate = votes[i]
    const amount = counts[candidate]
    counts[candidate] = amount ? amount + VOTE : VOTE
  };

  return counts
}

const convertCountsToArray = counts => Object.values(counts)
const sortVotesInDescendingOrder = numberOfVotes => numberOfVotes.sort((a, b) => b - a)
const getMajorityScore = votes => Math.floor(votes.length / 2)

exports.tally = function (votes) {
  const counts = countVotes(votes)
  const numberOfVotes = sortVotesInDescendingOrder(convertCountsToArray(counts))
  const winner = numberOfVotes[0]
  const isWinnerReachesMajorityOfVotes = winner >= getMajorityScore(votes)

  function getMajorityWinner () {
    for (const key in counts) {
      if (counts[key] === winner) {
        return [Number(key)]
      }
    }
  }

  function getWinners () {
    const winners = []
    const firstThreeWinners = numberOfVotes.slice(0, 3)
    for (const key in counts) {
      const value = counts[key]
      const isWinner = firstThreeWinners.includes(value)
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
