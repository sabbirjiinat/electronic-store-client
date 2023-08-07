const PaymentHistoryTable = ({PaymentHistoryProduct}) => {
    const {name,paidStatus,picture,price,transitionId} = PaymentHistoryProduct
    return (
        <tr className="text-base font-medium text-gray-600">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 rounded-full">
              <img src={picture} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>

      <td>{name}</td>
      <td>${price}</td>
      <td>{paidStatus ? 'True': 'false'}</td>
      <td>{transitionId}</td>
    </tr>
    );
};

export default PaymentHistoryTable;