import React from 'react';
import {connect, useDispatch} from "react-redux";
import {openCurrentPage} from "../../redux/actions/actions";
import {pageNumber} from "../../redux/selectors";
import {v4 as uuidv4} from "uuid";
import {NavLink} from "react-router-dom";

const Pagination = ({pageNumber}) => {

    const dispatch = useDispatch()

    return (
        <div>
            {pageNumber.map(number => (
                <span key={uuidv4()} onClick={() => dispatch(openCurrentPage(number))}>
                    <NavLink to={number} className="Pagination">{number}</NavLink></span>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pageNumber: pageNumber(state),
    }
}

export default connect(mapStateToProps)(Pagination);
