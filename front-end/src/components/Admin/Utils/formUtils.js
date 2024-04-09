// utils.js

export const calculatePoolish = ({ prodWidth, prodLength, resultPoolish }) => {
  const width = parseFloat(prodWidth);
  const length = parseFloat(prodLength);
  const resultpol = parseFloat(resultPoolish);
  if (isNaN(width) || isNaN(length) || isNaN(resultpol)) {
    return "";
  }

  const result = ((width * length) / 144) * resultpol;
  return isNaN(result) ? "" : result.toFixed(2);
};

export const calculateEdgePoolish = ({ prodLength, edgepoolishrate, prodQuantity }) => {
  const length = parseFloat(prodLength);
  const edgerate = parseFloat(edgepoolishrate);
  const quant = parseFloat(prodQuantity);

  if (isNaN(length) || isNaN(edgerate) || isNaN(quant)) {
    return "";
  }

  const result = (length / 12) * edgerate * quant;
  return isNaN(result) ? "" : result.toFixed(2);
};

export const calculateResult = ({ prodWidth, prodLength, measurementType, prodQuantity }) => {
  const width = parseFloat(prodWidth);
  const length = parseFloat(prodLength);
  const quant = parseFloat(prodQuantity);

  if (isNaN(width) || isNaN(length) || isNaN(quant)) {
    return "";
  }

  if (measurementType === "squareFoot") {
    const result = (width * length * quant) / 144;
    return isNaN(result) ? "" : result.toFixed(2);
  } else if (measurementType === "runningFoot") {
    const result = (length / 12) * quant;
    return isNaN(result) ? "" : result.toFixed(2);
  }

  return "";
};

export const calculateProductAmount = ({ measurementType, prodRate, result }) => {
  const prodrate = parseFloat(prodRate);
  const sqt = parseFloat(result);

  if (isNaN(prodrate) || isNaN(sqt)) {
    return "";
  }

  if (measurementType === "squareFoot") {
    const result = prodrate * sqt;
    return isNaN(result) ? "" : parseInt(result, 10);
  } else if (measurementType === "runningFoot") {
    const result = prodrate * sqt;
    return isNaN(result) ? "" : parseInt(result, 10);
  }

  return "";
};


export const calculateTotal = (formData) => {
  const prod = parseFloat(formData.prodamount) || 0;
  let poolish = 0;
  let edge = 0;

  if (formData.topPoolish) {
    poolish = parseFloat(formData.poolishAmount) || 0;
  }

  if (formData.edgepoolish) {
    edge = parseFloat(formData.edgepoolishamount) || 0;
  }

  const subtotal = prod + poolish + edge;

  return isNaN(subtotal) ? "" : parseInt(subtotal, 10);
};