import React from 'react';
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title> {title} </title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To BienBeau',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta;