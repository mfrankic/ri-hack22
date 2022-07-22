const UP_KEY_CODE = 37;
const RIGHT_KEY_CODE = 38;
const DELETE_KEY_CODE = 8;
const BACKSPACE_KEY_CODE = 46;
const DIGIT_ZERO_KEY_CODE = 48;
const NUMPAD_ZERO_KEY_CODE = 96;
const DIGIT_NINE_KEY_CODE = 57;
const NUMPAD_NINE_KEY_CODE = 105;

const onKeyDown = (e, dateLength) => {
  if (e.keyCode === UP_KEY_CODE || e.keyCode === RIGHT_KEY_CODE) {
    e.preventDefault();
  }
  e.target.setSelectionRange(dateLength, dateLength);

  return e.keyCode;
};

const onChange = (e, key, dateLength) => {
  const dateValue = e.target.value;

  // Allow only numbers
  if (
    (key >= DIGIT_ZERO_KEY_CODE && key <= DIGIT_NINE_KEY_CODE) ||
    (key >= NUMPAD_ZERO_KEY_CODE && key <= NUMPAD_NINE_KEY_CODE)
  ) {
    const dateSplit = dateValue.split('.');
    const dayNum = parseInt(dateSplit[0], 10);
    const monthNum = parseInt(dateSplit[1], 10);

    let day = dateSplit[0];
    let month = dateSplit[1] ? dateSplit[1] : '';
    let year = dateSplit[2] ? dateSplit[2] : '';

    const currentYear = new Date().getFullYear();
    const minYear = 1900;

    if (day.match(/^(0?[4-9])$/)) {
      day = `0${dayNum}`;
    } else if (dayNum > 30) {
      day = '31';
    }

    if (day.length === 2) {
      if (!dayNum) {
        day = '01';
      }
      day += '.';
    }

    if (month.match(/^(0?[2-9])$/)) {
      month = `0${monthNum}`;
    }
    if (month.length === 2) {
      if (monthNum > 11) {
        month = '12';
      } else if (!monthNum) {
        month = '01';
      }
      const d = new Date(currentYear, parseInt(month, 10), 0).getDate();
      if (dayNum > d) {
        day = `${d}.`;
      }
      month += '.';
    }

    const maxSubYear = currentYear.toString().substring(0, year.length);
    const minSubYear = minYear.toString().substring(0, year.length);

    if (year > maxSubYear) {
      year = maxSubYear;
    } else if (year < minSubYear) {
      year = minSubYear;
    }

    if (year.length === 4) {
      const d = new Date(parseInt(year, 10), monthNum, 0).getDate();
      if (dayNum > d) {
        day = `${d}.`;
      }
    }

    e.target.value = `${day}${month}${year}`;
  }
  // Handle backspace press
  else if (
    (key === BACKSPACE_KEY_CODE || key === DELETE_KEY_CODE) &&
    (dateLength === 3 || dateLength === 6)
  ) {
    e.target.value = dateValue.substring(0, dateLength - 2);
  }
  // If pressed key is Nan
  else {
    e.target.value = dateValue.substring(0, dateLength);
  }

  return e.target.value.length;
};

export default {
  onChange,
  onKeyDown,
};
