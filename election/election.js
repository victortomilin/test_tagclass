//
// Performance issue
//
// Well, to make this algorithm much more faster
// I can suggest to split the entire array of votes by the fragments.
// Then each fragment will be sent to `tally` function which will be ran in cluster.
// That's means we could use multithreading to calculate winners.
// But I couldn't apply this approach by unit tests reason. But at least
// I have made a unit test to check is my alghorithm will be sutible to calculate
// 10 millions votes for 401 candidates. Looks like it works quite good.

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
