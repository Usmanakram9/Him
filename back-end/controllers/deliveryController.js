import Delivery from '../models/deliveryModel.js'
// Create a new delivery
const createDelivery = async (req, res) => {
    try {
      const delivery = new Delivery(req.body);
      await delivery.save();
      res.status(201).json(delivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get all deliveries
  const getAllDeliveries = async (req, res) => {
    try {
      const deliveries = await Delivery.find();
      res.status(200).json(deliveries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get a specific delivery by ID
  const getDeliveryById = async (req, res) => {
    try {
      const delivery = await Delivery.findById(req.params.id);
      if (!delivery) {
        return res.status(404).json({ error: 'Delivery not found' });
      }
      res.status(200).json(delivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a delivery by ID
  const updateDeliveryById = async (req, res) => {
    try {
      const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!delivery) {
        return res.status(404).json({ error: 'Delivery not found' });
      }
      res.status(200).json(delivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a delivery by ID
  const deleteDeliveryById = async (req, res) => {
    try {
      const delivery = await Delivery.findByIdAndRemove(req.params.id);
      if (!delivery) {
        return res.status(404).json({ error: 'Delivery not found' });
      }
      res.status(200).json({ message: 'Delivery deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getDeliveryByCustomerBillAndField = async (req, res) => {
    try {
      const { customerId, billId, formFieldId } = req.params;
  
      const delivery = await Delivery.find({
        customerId,
        billId,
        formFieldId,
      });
  
      if (!delivery) {
        return res.status(404).json({ error: 'Delivery not found' });
      }
  
      res.status(200).json(delivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    updateDeliveryById,
    deleteDeliveryById,
    getDeliveryByCustomerBillAndField
  };