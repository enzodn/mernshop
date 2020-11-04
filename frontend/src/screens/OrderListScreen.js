import React, {useEffect} from 'react';
import {Button, Row, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {LinkContainer} from 'react-router-bootstrap'
import {listOrders} from "../actions/orderActions";


const OrderListScreen = ({history}) => {
        const dispatch = useDispatch()

        const orderList = useSelector(state => state.orderList)
        const {loading, error, orders} = orderList

        const userLogin = useSelector(state => state.userLogin)
        const {userInfo} = userLogin

        useEffect(() => {
            if (!userInfo.isAdmin) {
                history.push('/login')
            } else {
                dispatch(listOrders())
            }
        }, [userInfo, dispatch, history])

        return (
            <>
                <Row className='align-items-center'>Orders</Row>
                {loading ? <Loader/> :
                    error ? <Message variant='danger'>{error}</Message> : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='outline-primary'>
                                                {order._id}
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times'/>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times'/>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                    )
                }
            </>
        );
    }
;

export default OrderListScreen;
