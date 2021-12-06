function math(lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue,
  }[operator];
}

function format_date(date) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}

module.exports = { math, format_date };
