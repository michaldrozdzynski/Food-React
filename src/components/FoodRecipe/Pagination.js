import React from 'react'
import {Col, Row} from 'react-bootstrap'


function Pagination(props) {
    let pages = []
    
    if (props.currentPage > 4) {
        pages.push(<div key={1} onClick={() => props.handleClick(1)}>1</div>)
        pages.push(<span key="previous">...</span>)

        for (let i = props.currentPage-2; i<=props.currentPage+2&&i<=props.lastPage; i++) {
            if(i === props.currentPage) {
                pages.push(<div key={i} className="currentPage">{i}</div>)
            } else {
                pages.push(<div key={i} onClick={() => props.handleClick(i)}>{i}</div>)
            }
        }

        if (props.currentPage+2 < props.lastPage) {
            pages.push(<span key="next">...</span>)
            pages.push(<div key={props.lastPage} onClick={() => props.handleClick(props.lastPage)}>{props.lastPage}</div>)
        }
    } else {
        for (let i = 1; i <= props.currentPage+2&&i<=props.lastPage; i++) {
            if(i === props.currentPage) {
                pages.push(<div key={i} className="currentPage">{i}</div>)
            } else {
                pages.push(<div key={i} onClick={() => props.handleClick(i)}>{i}</div>)
            }
        }

        if (props.lastPage > props.currentPage + 2) {
            pages.push(<span key="nexts">...</span>)
            pages.push(<div key={props.lastPage} onClick={() => props.handleClick(props.lastPage)}>{props.lastPage}</div>)
        }
    }
    

    const nextClass = props.currentPage >= props.lastPage ? "disabled" : ""
    const prevClass = props.currentPage <= 1 ? "disabled" : ""

    return (
            
        <div className="pagination">  
            <div className={prevClass} onClick={() => prevClass==="" ? props.handleClick(props.currentPage - 1) : null}>Previous</div>
                {pages}
            <div className={nextClass} disabled onClick={() => nextClass==="" ? props.handleClick(props.currentPage + 1) : null}>Next</div>
        </div>
    )
}

export default Pagination