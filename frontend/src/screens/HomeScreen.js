import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Product from '../components/Product'
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <>
            <Meta/>
            {!keyword ? <ProductCarousel/> :
                <Link to='/' className='btn btn-outline-dark'>Go Back</Link>}
            <h1>Latest Products</h1>
            {loading ? (<Loader/>)
                : error ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>)}
        </>
    );
};

export default HomeScreen;
