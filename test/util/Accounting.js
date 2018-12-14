const calcFee = (itemAmount, franchiseFeePercent) => parseInt(itemAmount / franchiseFeePercent);
const calcNet = (itemAmount, franchiseFeePercent) => itemAmount - calcFee(itemAmount, franchiseFeePercent);

module.exports = {
    calcFee,
    calcNet
};