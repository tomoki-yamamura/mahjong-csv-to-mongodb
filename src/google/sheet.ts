import { GoogleSpreadsheet } from "google-spreadsheet";
import { GoogleSpreadsheetFactory } from "../factory/doc";
import { Row } from "./row";

export async function getRowObjectFromSheet(doc: GoogleSpreadsheet, sheetIndex: number): Promise<Row[]> {
  // await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];
  const rows = await sheet.getRows();
  const result = rows.map((row) => {
    const obj = row.toObject();
    return new Row(obj);
  })
  return result
}

export async function getPlayersNameFromSheet(doc: GoogleSpreadsheet, sheetIndex: number): Promise<string[]> {
  const sheet = doc.sheetsByIndex[sheetIndex];
  await sheet.loadHeaderRow()
  const headers: string[] = sheet.headerValues;
  return headers;
}
