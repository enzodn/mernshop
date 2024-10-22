import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import {deliverOrder, getOrderDetails, payOrder} from "../actions/orderActions";
import Loader from "../components/Loader";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../constants/orderConstants";

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {success: successDeliver} = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty, 0
        )
    }

    useEffect(() => {
            if (!userInfo) {
                history.push('/login')
            }
            const addPayPalScript = async () => {
                const {data: clientId} = await axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }

            if (!order || successPay || order._id !== orderId || successDeliver) {
                dispatch({type: ORDER_PAY_RESET})
                dispatch({type: ORDER_DELIVER_RESET})
                dispatch(getOrderDetails(orderId))
            } else if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }, [history, userInfo, dispatch, order, orderId, successPay, successDeliver]
    )

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId))
    }

    return (
        loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message> :
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>

                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {' '}
                                        {order.shippingAddress.city}, {' '}
                                        {order.shippingAddress.postalCode}, {' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ?
                                        <Message variant='success'>Paid on {order.deliveredAt}</Message> :
                                        <Message variant='danger'>Not Delivered</Message>}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                        <Message variant='danger'>Not Paid</Message>}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.id}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            {item.qty} x ${item.price} =
                                                            ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader/>}
                                            {!sdkReady ? <Loader/> : (
                                                <PayPalButton amount={order.totalPrice.toFixed(2)}
                                                              onSuccess={successPaymentHandler}
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                                Mark as delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
    );
};

export default OrderScreen;