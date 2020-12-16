(function () {
  let errorCount = 0;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const stepElement = event.target;
    const nextStepElement = stepElement.nextElementSibling;
    const isValid = getStepIsValid(stepElement);

    const stepName = getStepName(stepElement);
    const stepNumber = getStepNumber(stepElement);

    showStepResult(stepElement, isValid);

    if (!isValid) {
      publishGdlEvent('error', {
        id: errorCount++,
        message: `bad input in step ${stepNumber}`,
      });
      return;
    }

    if (stepName === 'finalize') {
      publishGdlEvent(`shipmentComplete`, getStepData(stepElement));
    } else {
      publishGdlEvent(
        `${getStepName(stepElement)}Complete`,
        getStepData(stepElement)
      );
    }

    disableStep(stepElement);
    showStep(nextStepElement);
  };

  const getStepName = (stepElement) => stepElement.getAttribute('name');

  const getStepNumber = (stepElement) =>
    parseInt(stepElement.getAttribute('step'));

  const getStepData = (stepElement) => {
    return [
      ...stepElement.querySelectorAll(
        'input[type="text"],input[type="hidden"],select'
      ),
    ].reduce((result, input) => {
      return {
        ...result,
        ...JSON.parse(input.value),
      };
    }, {});
  };

  const getStepIsValid = (stepElement) => {
    const select = stepElement.querySelector('select');
    return select ? select.value !== '' : true;
  };

  const showStepResult = (stepElement, isValid) => {
    const resultElement = stepElement.querySelector(
      isValid ? '.success' : '.error'
    );
    resultElement.classList.add('visible');

    setTimeout(() => {
      resultElement.classList.remove('visible');
    }, 1000);
  };

  const disableStep = (stepElement) => {
    stepElement
      .querySelectorAll('select, input')
      .forEach((element) => element.setAttribute('disabled', ''));
  };

  const showStep = (stepElement) => {
    stepElement.classList.add('active');
    publishGdlEvent('viewStep', {
      stepNumber: getStepNumber(stepElement),
      stepName: getStepName(stepElement),
    });

    if (getStepName(stepElement) === 'finalize') {
      publishGdlEvent('viewRate', {
        amount: 100,
        currency: 'USD',
      });
    }
  };

  const publishGdlEvent = (name, payload) => {
    window.gdl.publishEvent(name, payload);
  };

  document
    .querySelectorAll('form')
    .forEach((form) => form.addEventListener('submit', handleFormSubmit));

  document.querySelector('.ship-again').addEventListener('click', () => {
    publishGdlEvent('shipAgain');
    document.location.reload();
  });
  publishGdlEvent('pageInfo', { pageId: 'GB|en|apps|simple-shipping' });
  showStep(document.querySelector('.section'));
})();
