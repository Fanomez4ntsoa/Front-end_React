import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";

const HomePage = ({ match }) => {
    const keyword = match?.params?.keyword;

    const pageNumber = match?.params?.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    
    useEffect(() => {
            dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className="btn btn-light">
                    Go Back
                </Link>
            )}
            <h1> Latest Products </h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'> {error} </Message>
            ) : (
                <>
                    <Row>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                        ) : (
                            <Message variant='info'>No products found</Message>
                        )
                    }
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>

    );
}

export default HomePage;