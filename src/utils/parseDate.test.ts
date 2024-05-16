import parseDateString from "./parseDate";
import moment from 'moment';

  describe("parseDateString", () => {
    it("should have result correct formated", () => {
      const dateString = '2024-01-01'
      const timeString = '0:01'
      const formattedDate = parseDateString(dateString, timeString)
      expect(formattedDate instanceof Date).toBe(true)
    })
  })
  