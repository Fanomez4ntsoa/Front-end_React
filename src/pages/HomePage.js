import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber ])
}

export default HomePage;