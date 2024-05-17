export class Row {
  public readonly ID: string;
  public readonly Date: string;
  public readonly Timestamp: string;
  public readonly Users: Partial<Record<string, string>>

  constructor(obj: Partial<Record<string, any>>) {
    this.ID = obj.ID;
    this.Date = obj.Date;
    this.Timestamp = obj.Timestamp;
    this.Users = this.extractPlayers(obj)
  }

  private extractPlayers(obj: any): Partial<Record<string, string>> {
    const users = (({ ID, Date, Timestamp, ...rest }) => rest)(obj); //Immediately-Invoked Function Expression
    const result = Object.fromEntries(
      Object.entries(users).filter(([key, value]) => value !== undefined)
    )
    return result as Partial<Record<string, string>>;
  }
}
