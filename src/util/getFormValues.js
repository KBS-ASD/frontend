/***
 * getFormValues(submitEvent.currentTarget.elements);
 */
export default elements =>
  Array.from(elements).reduce((accumulator, currentValue) => {
    if (currentValue.name) accumulator[currentValue.name] = currentValue.value;

    return accumulator;
  }, {});
