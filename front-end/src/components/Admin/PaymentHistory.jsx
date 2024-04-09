import React, {useEffect,useState,useCallback,useMemo} from 'react'
import { usePaymentStore } from '../../stores/paymentStore';
import { useParams,useNavigate } from 'react-router-dom';
import {format} from 'date-fns';
import { useBillStore } from '../../stores/billStore';

const PaymentHistory = () => {
	const { getSingleBill, singleBill } = useBillStore();
  const [recordsToShow, setRecordsToShow] = useState(5); 
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
    const {billId,custId} = useParams();
    const {getPaymentsByBillId,payments,isLoading, error} = usePaymentStore();

	const fetchSingleBill = useCallback(async () => {
		await getSingleBill(billId);
	  }, [billId, getSingleBill]);
	  useEffect(() => {
		fetchSingleBill();
	  }, [fetchSingleBill]);
	  const { totalAmount, paidAmount, balance,customerName,customerAddress,customerPhone } = useMemo(() => {
		// Access the properties from the fetched singleBill
		const totalAmount = singleBill?.totalAmount || 0;
		const paidAmount = singleBill?.paidAmount || 0;
		const balance = singleBill?.balance || 0;
		const customerName = singleBill?.customerName || '';
		const customerAddress = singleBill?.factoryName || '';
		const customerPhone = singleBill?.contactNum || '';

	  
		return { totalAmount, paidAmount, balance,customerName,customerAddress,customerPhone };
	  }, [singleBill]);
	
	 

    useEffect(() => {
        // Fetch the form field when the component mounts
        
        getPaymentsByBillId(billId,custId);
      }, [billId,custId]);
      

      if (!payments) {
        return <p>Data is still loading...</p>;
      }
    
      const filteredDeliveries = payments ? payments.filter((payment) =>
      payment._id.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
  return (
    <> 
     <div className="mx-auto mt-8 p-8">
    <button className="text-blue-500 text-sm mb-4" onClick={()=>{
		
navigate(`/admin-panel/InvoiceHub/${custId}`)
     }} >
          &larr; Back
        </button>
        </div>

		<div className="flex items-start ml-10">
		<div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">{customerName}</h3>
      <div className="mb-4">
        <p className="text-gray-600">Address:</p>
		<h3 className="text-2xl font-semibold mb-4">{customerAddress}</h3>
        
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Phone Number:</p>
		<h3 className="text-2xl font-semibold mb-4">{customerPhone}</h3>
        
      </div>
    </div>
	</div>
        <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
	<div className="overflow-x-auto">
		<div className="searchBar">
		<input
            type="text"
            placeholder="Search by Payment Tag"
            className="border border-gray-500 rounded-md px-2 py-1 ml-2 mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
		</div>
		
		<table className="min-w-full bg-white border border-gray-200 rounded-xl">
		<thead>
				<tr className="bg-gray-200 h-30px">
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paid </th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
					</tr>
			</thead>

			<tbody>
			<tr className="h-72px hover:bg-gray-100 transition duration-150 ease-in-out">
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
						{totalAmount}
</td>
<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
	{paidAmount}
</td>
<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
	{balance}
</td>
</tr>
			</tbody>
			</table>
	
	{payments ? (
		<table className="min-w-full bg-white border border-gray-200 rounded-xl">
			
			<thead>
				<tr className="bg-gray-200 h-30px">
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Tag</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Date</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paid</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paid Via</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cheque Number</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction ID</th>
					
				
				</tr>
			</thead>
			<tbody>
			{filteredDeliveries.slice(0, recordsToShow).map((payment, index) => (
				<tr key={index} className="h-72px hover:bg-gray-100 transition duration-150 ease-in-out">
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
						<div className="flex items-center flex-row gap-2">
							<span className="text-base">{payment._id}</span>
						</div>
					</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      {format(new Date(payment.dated), 'dd-MM-yyyy')}
    </td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{payment.totalAmount}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{payment.paid}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{payment.balance}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{payment.paidVia}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{payment.chequeNumber}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{payment.transactionNumber}</td>
				
        
			
				</tr>
				))}
			</tbody>
			<tfoot className="bg-gray-50 h-56px">
				<tr>
					<td className="px-12 py-4 whitespace-no-wrap text-sm font-normal text-center" colSpan="12">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<span className="mr-2">Show Records</span>
								<select
            className="form-select border border-gray-300 rounded-md px-2 py-1 focus:ring focus:ring-blue-200 focus:border-blue-500 text-sm"
            onChange={(e) => setRecordsToShow(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
		
							</div>
						
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
		 ) : (
			<p>Data is still loading...</p>
		  )}
	</div>
</div>
      
    </>

  )
}

export default PaymentHistory
