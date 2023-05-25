const { helpers } = require("./utils/helper");

// Set up handlebars helper
const hbs = exphbs.create({ helpers });

module.exports = {
    format_time: (time) => {
      return time.toString().slice(0, -3)
    },
    format_date: (date) => {
      return `${new Date(date).getDay() + 1}/${new Date(date).getMonth()}/${
        new Date(date).getFullYear() + 5
      }`;
    },
  };