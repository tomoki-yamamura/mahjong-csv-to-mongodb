import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const key = `${process.env.GOOGLE_PRIVATE_KEY}`.replace(/\\n/g, '\n')
const sheetId: string = `${process.env.GOOGLE_SHEET_ID}`

const serviceAccountAuth = new JWT({
  email: email,
  key: key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

export class GoogleSpreadsheetFactory {
  constructor() {}
  async createGoogleSheetDoc(): Promise<GoogleSpreadsheet> {
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth)
    await doc.loadInfo()
    return doc
  }
}
