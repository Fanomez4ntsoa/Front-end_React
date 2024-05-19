import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/ProductActions';
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        if(!products || !products.data || products.data.length === 0) {
            dispatch(listTopProducts())
        }
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'> { error } </Message>
    ) : (
        <Carousel pause='hover' className='bg-dark'>
            {Array.isArray(products.data) && products.data.length > 0 ? (
                products.data.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))
            ) : (
                <Message variant='info'>No top rated products found</Message>
            )}
        </Carousel>
    )
}

export default ProductCarousel;
