const express = require('express');
const { route } = require('.');
const { entertainmentService, entertainmentBill, typeTicketController } = require('../controllers/entertainment_controller');
const entertainment_bill = require('../models/entertainment_bill');

const router = express.Router();
const billRouter = express.Router({ mergeParams: true });
const typeTicketRouter = express.Router({ mergeParams: true });

/**
 *  Add new entertainment
 */
router.post('/', entertainmentService.add_entertainment);
/**
 *  Get all entertainment
 */
router.get('/', entertainmentService.get_all_entertainment);

router.get('/find_entertainment_bills_by_date', entertainmentBill.get_bills_of_the_day);

router.patch('/delete_ticket_in_entertainment/:id', entertainmentService.delete_ticket_in_entertainment);

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
billRouter.post('/', entertainmentBill.add_entertainment_bill);
/**
 *  Get all entertainment bill of the day
 */
billRouter.get('/', entertainmentBill.get_bills_of_the_day);
/**
 *  Get all entertainment bill
 */
billRouter.get('/get_all_biil', entertainmentBill.get_all_bill);

router.use("/type_ticket", typeTicketRouter);
/**
 *  Get all entertainment
 */

typeTicketRouter.post('/', typeTicketController.add_type_ticket);

typeTicketRouter.patch('/:id', typeTicketController.update_type_ticket);

typeTicketRouter.delete('/:id', typeTicketController.delete_type_ticket);

typeTicketRouter.get('/all', typeTicketController.get_all_type_ticket);

module.exports = router 