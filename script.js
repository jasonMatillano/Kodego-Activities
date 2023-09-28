function appendToResult(value) {
    const result = document.getElementById('result');
    if (result.textContent === '0') {
      result.textContent = value;
    } else {
      result.textContent += value;
    }
  }

  function clearResult() {
    document.getElementById('result').textContent = '0';
  }

  function evaluateResult() {
    const result = document.getElementById('result');
    result.textContent = eval(result.textContent);
  }