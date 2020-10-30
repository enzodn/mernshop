import React from 'react';
import {Link} from 'react-router-dom'
import {Card} from "react-bootstrap";
import Rating from "./Rating";

const Product = ({product}) => {
    return (
        // my-# Responsive top and bottom margin auto (vertical) classes. * can be sm, md, lg or xl. # can be a number between 0 and 5
        // py-# Responsive padding classes. * can be sm, md, lg or xl. # can be a number between 0 and 5
        <Card className='card border-light my-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </Card.Text>

                <Card.Text as='h5'>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
