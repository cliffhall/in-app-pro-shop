const calcFee = (itemAmount, franchiseFeePercent) => parseInt(itemAmount/100 * franchiseFeePercent);
const calcNet = (itemAmount, franchiseFeePercent) => itemAmount - calcFee(itemAmount, franchiseFeePercent);

module.exports = {
    calcFee,
    calcNet
};