import parseStringToDate from './parseDate';
import moment from 'moment';

  describe("parseDateString", () => {
    it("should have result correct formated", () => {
      const dateString = '2024-01-01'
      const timeString = '0:01'
      const formattedDate = parseStringToDate(dateString, timeString)
      expect(formattedDate instanceof Date).toBe(true)
    })
  })
  