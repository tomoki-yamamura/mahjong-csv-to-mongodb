import parseStringToDate from "../utils/parseDate";

export type Users = Record<string, string>

export class Score {
  public readonly ID: string;
  public readonly Date: Date;
  public readonly Users: Users;

  constructor(obj: Partial<Record<string, any>>) {
    this.ID = obj.ID
    this.Date = this.setDate(obj.Date, obj.Timestamp)
    this.Users = this.extractPlayers(obj)
  }

  private setDate(date: string, timestamp: string): Date {
    return parseStringToDate(date, timestamp);
  }

  private extractPlayers(obj: any): Record<string, string> {
    const users = (({ ID, Date, Timestamp, ...rest }) => rest)(obj); //Immediately-Invoked Function Expression
    const result = Object.fromEntries(
      Object.entries(users).filter(([key, value]) => value !== undefined)
    )
    return result as Record<string, string>;
  }
}
