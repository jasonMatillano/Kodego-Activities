function appendToResult(value) {
    document.getElementById('result').value += value;
  }

  function clearResult() {
    document.getElementById('result').value = '';
  }

  function evaluateResult() {
    const result = document.getElementById('result').value;
    if (result) {
      document.getElementById('result').value = eval(result);
    }
  }