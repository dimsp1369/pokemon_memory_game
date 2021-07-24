import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {openCurrentPage} from "../../redux/actions/actions";

const Pagination = () => {

    const dispatch = useDispatch()
    const pageNumber = useSelector(state => state.gameReducer.pagination.pageNumber)

    return (
        <div style={{marginTop: 10}}>
            {pageNumber.map(number => (
                <span key={number} onClick={() => dispatch(openCurrentPage(number))}><a href="!#" style={{
                    paddingLeft: 10,
                    textDecoration: "none",
                    fontSize: 24
                }}>{number}</a></span>
            ))}
        </div>
    );
};

export default Pagination;
