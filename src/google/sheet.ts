import { GoogleSpreadsheet } from "google-spreadsheet";
import  Score  from "./score";

export async function getScoresObjectFromSheet(doc: GoogleSpreadsheet, sheetIndex: number): Promise<Score[]> {
  const sheet = doc.sheetsByIndex[sheetIndex];
  const rows = await sheet.getRows();
  const result = rows.map((row) => {
    const obj = row.toObject();
    return new Score(obj);
  })
  return result
}

export async function getPlayersNameFromSheet(doc: GoogleSpreadsheet, sheetIndex: number): Promise<string[]> {
  const sheet = doc.sheetsByIndex[sheetIndex];
  await sheet.loadHeaderRow()
  const headers: string[] = sheet.headerValues;
  return headers;
}
