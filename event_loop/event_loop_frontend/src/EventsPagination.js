import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";


class EventsPagination extends Component {
  constructor(props) {
    super(props);

    };

    render() {
      return (
        <div>

          <div>
            <Pagination
              activePage={this.props.activePage}
              itemsCountPerPage={10}
              totalItemsCount={this.props.totalItemsCount}
              pageRangeDisplayed={5}
              onChange={this.props.handlePageChange}
              prevPageText={`Previous`}
              nextPageText={`Next`}
              hideDisabled={true}
              itemClass="pagination-list-item"
              activeLinkClass="pagination-link"
            />
          </div>
        </div>

      );
    }
  }

  export default EventsPagination;
