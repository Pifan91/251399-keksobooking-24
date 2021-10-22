const toggleElements = (elements) => {
  elements.forEach((element) => {
    (element.disabled) ? element.disabled = false : element.disabled = true;
  });
};

const toggleForm = (form) => {
  const formFieldsets = form.querySelectorAll('fieldset');
  const formSelects = form.querySelectorAll('select');
  const formInputs = form.querySelectorAll('input');

  //Сомнительное решение если будет более одного класса у формы.
  form.classList.toggle(`${form.classList.value}--disabled`);
  toggleElements(formFieldsets);
  toggleElements(formSelects);
  toggleElements(formInputs);
};

export { toggleForm };
