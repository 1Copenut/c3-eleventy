const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

function generatePermalinkDate(date) {
  return dayjs(date).utc().format('YYYY-MM-DD');
}

module.exports = generatePermalinkDate;
