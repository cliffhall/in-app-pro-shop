module.exports = {
    calcFee : (price, feePercent) => price * feePercent,
    calcNet : (price, feePercent) => price - (price * feePercent),
    calcBalance : (initial, transAmt, txCost) => (initial + transAmt) - txCost
};