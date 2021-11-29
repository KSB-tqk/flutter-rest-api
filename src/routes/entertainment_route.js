const express = require('express');
const { route } = require('.');
const {entertainmentService, entertainmentBill, typeTicketController} = require('../controllers/entertainment_controller');

const router = express.Router();
const billRouter = express.Router({mergeParams: true});

/**
 *  Add new entertainment
 */
router.post('/', entertainmentService.add_entertainment);
/**
 *  Get all entertainment
 */
router.get('/', entertainmentService.get_all_entertainment);
/**
 *  Get all entertainment
 */
 router.post('/type', typeTicketController.add_type_ticket);
/**
 *  update a entertainment
 */
router.patch('/:id', entertainmentService.update_entertainment);
/**
 *  update a entertainment
 */
router.delete('/:id', entertainmentService.delete_entertainment);
/**
 *  Entertainment Bill
 */
router.use("/bill", billRouter);
/**
 *  Add new entertainment bill
 */
router.post('/bill/add', entertainmentBill.add_entertainment_bill);
/**
 *  Get all entertainment bill
 */
billRouter.get('/', entertainmentBill.get_all_bill);

module.exports = router 