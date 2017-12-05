import React, { Component } from 'react';

import SearchListItem from '../../containers/SearchList_item'

class SearchList extends Component {
  
  render(){
    return(
      Object.values(this.props.passing).map((trip, index) => (
          <div  key = { index }>
            <SearchListItem trip = { trip } />
          </div>
        )
      )
    )
  }
}

export default SearchList;