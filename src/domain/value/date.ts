class PlayedDate {
  private date: Date
  constructor(date: Date) {
    this.date = date
  }

  getDate(): Date {
    return this.date
  }

  isEqualTo(otherDate: PlayedDate): boolean {
    return this.date.toISOString() === otherDate.getDate().toISOString();
  };
}

export default PlayedDate