import React, { useState, useEffect } from "react";

function NumericInput({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  id,
  onChange,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const getPrecision = () => {
    if (precision !== undefined) return precision;
    const stepStr = step.toString();
    if (stepStr.indexOf(".") >= 0) {
      return stepStr.split(".")[1].length;
    }
    return 0;
  };

  const handleIncrement = () => {
    const prec = getPrecision();
    let newValue = parseFloat((inputValue + step).toFixed(prec));
    if (newValue > max) newValue = max;
    newValue = parseFloat(newValue.toFixed(prec));
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue, newValue.toString(), { id });
    }
  };

  const handleDecrement = () => {
    const prec = getPrecision();
    let newValue = parseFloat((inputValue - step).toFixed(prec));
    if (newValue < min) newValue = min;
    newValue = parseFloat(newValue.toFixed(prec));
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue, newValue.toString(), { id });
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    let parsed = parseFloat(inputValue);
    if (isNaN(parsed)) {
      parsed = min !== -Infinity ? min : 0;
    }
    if (parsed < min) parsed = min;
    if (parsed > max) parsed = max;

    const prec = getPrecision();
    parsed = parseFloat(parsed.toFixed(prec));

    setInputValue(parsed);
    if (onChange) {
      onChange(parsed, parsed.toString(), { id });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className="inline-flex items-center select-none font-sans my-1">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-10 h-10 flex items-center justify-center border border-slate-350 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xl font-bold rounded-l-md hover:bg-slate-200 dark:hover:bg-zinc-700 active:bg-slate-300 dark:active:bg-zinc-600 transition-colors focus:outline-none"
      >
        −
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-16 h-10 border-t border-b border-slate-350 dark:border-zinc-700 text-center font-semibold bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-200 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="w-10 h-10 flex items-center justify-center border border-slate-350 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xl font-bold rounded-r-md hover:bg-slate-200 dark:hover:bg-zinc-700 active:bg-slate-300 dark:active:bg-zinc-600 transition-colors focus:outline-none"
      >
        +
      </button>
    </div>
  );
}

export default NumericInput;
