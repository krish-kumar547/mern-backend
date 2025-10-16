const Order=require('../model/Ordermodel');

const placeorder= async (req, res) => {
  const { userId, items, shippingAddress, totalAmount } = req.body;
  try {
    const newOrder = new Order({ userId, items, shippingAddress, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Order failed', error: err });
  }
};


const updatepayment= async (req, res) => {
  const { orderId } = req.params;
  const { paymentId, paymentStatus } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentId, paymentStatus },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update payment', error: err });
  }
};


const myorders= async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
const orderdetails=async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.productId', 'title sellingprice description'); // 👈 important
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order', error: err });
  }
};



const allorders=async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateorderstatus= async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
};
const adminorderdetails= async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('userId', 'name email') // Populate user data
      .populate('items.productId', 'title sellingprice'); // Populate product details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve order details', error: err.message });
  }
};

module.exports= {placeorder,updatepayment,myorders,orderdetails, allorders,adminorderdetails,updateorderstatus}


 