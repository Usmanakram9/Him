import React, {useEffect,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useDeliveryStore } from '../../stores/deliveryStore';
import {format} from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink,PDFViewer } from '@react-pdf/renderer'; 
import PDFDoc from './Utils/PDFDoc';

const CompletedDeliveryScreen = () => {
	const [recordsToShow, setRecordsToShow] = useState(5);  
	const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const {custID,billId,formFieldId}= useParams();
    const {getDeliveryByCustomerBillAndField,singleDelivery, isLoading, error} = useDeliveryStore();

    useEffect(() => {
        // Fetch bills based on the customer ID using Zustand store
        getDeliveryByCustomerBillAndField(custID,billId,formFieldId);
      }, [custID,billId,formFieldId, getDeliveryByCustomerBillAndField]);
	


if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 mb-2">Loading...</p>
        <div className="animate-spin border-t-4 border-blue-500 rounded-full h-12 w-12"></div>
        <p className="text-sm text-gray-600 mt-2">Himalaya Enterprises</p>
      </div>
    );
  }

  if (!singleDelivery) {
    return <p>Data is still loading...</p>;
  }

  const filteredDeliveries = singleDelivery ? singleDelivery.filter((delivery) =>
  delivery._id.toLowerCase().includes(searchQuery.toLowerCase())
) : [];
  return (
    <>
    <div className="mx-auto mt-8 p-8">
    <button className="text-blue-500 text-sm mb-4" onClick={()=>{ navigate(`/admin-panel/InvoiceHub/${custID}`)}} >
          &larr; Back
        </button>
        </div>
  
<div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
	<div className="overflow-x-auto">
		<div className="searchBar">
		<input
            type="text"
            placeholder="Search by Shipment Tag"
            className="border border-gray-500 rounded-md px-2 py-1 ml-2 mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
		</div>
	
	{singleDelivery ? (
		<table className="min-w-full bg-white border border-gray-200 rounded-xl">
			
			<thead>
				<tr className="bg-gray-200 h-30px">
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Shipment Tag</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Shipment Date & time</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Prodcut length</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Width</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Thickness</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Quantity</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Delivered By</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Driver Number</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle Number</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
					<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
				</tr>
			</thead>
			<tbody>
			{filteredDeliveries.slice(0, recordsToShow).map((delivery, index) => (
				<tr key={index} className="h-72px hover:bg-gray-100 transition duration-150 ease-in-out">
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
						<div className="flex items-center flex-row gap-2">
							<span className="text-base">{delivery._id}</span>
						</div>
					</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      {format(new Date(delivery.createdAt), 'dd-MM-yyyy hh:mm:ss a')}
    </td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.productName}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.productLength}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.productWidth}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.productThickness}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.productQuantity}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.driverName}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.driverNumber}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{delivery.vehicleNumber}</td>
					<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      {delivery.isDelivered ? (
        <span className="px-2 inline-flex text-xs leading-4 font-semibold rounded-full bg-green-400 text-gray-800">COMPLETED</span>
      ) : (
        <span className="px-2 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-200 text-gray-800">Pending</span>
      )}
    </td>
				<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
				<PDFDownloadLink
    document={<PDFDoc delivery={delivery} />}
    fileName={`delivery_record_${delivery._id}_date${delivery.createdAt}.pdf`}
  >
    {({ loading }) =>
      loading ? (
        'Loading document...'
      ) : (
        <button className="text-gray-500 hover:text-blue-500 focus:outline-none">
          <FontAwesomeIcon icon={faPrint} className="text-gray-500 hover:text-blue-500 ml-2 cursor-pointer" />
        </button>
      )
    }
  </PDFDownloadLink>
  <PDFViewer>
	<PDFDoc delivery={delivery}/>
  </PDFViewer>
  
    </td>
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

export default CompletedDeliveryScreen