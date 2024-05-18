import Score from "./score"

class ScoreList {
  private scores: Score[]
  constructor(scores: Score[]) {
    this.scores = scores
  }

  addScore(score: Score): void {
    if (!this.scores.some(existingScore => existingScore.isExistedScore(score))) {
      this.scores.push(score);
    }
  }
}