import { GoogleSpreadsheet } from "google-spreadsheet";
import { GoogleSpreadsheetFactory } from "../factory/doc";
import { Row } from "./row";

export const PLAYERS_3_SHEETID = 0
export const PLAYERS_4_SHEETID = 1

export async function getRowObjectFromSheet(doc: GoogleSpreadsheet, sheetIndex: number): Promise<Row[]> {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];
  const rows = await sheet.getRows();
  const result = rows.map((row) => {
    const obj = row.toObject();
    return new Row(obj);
  })
  return result
}
