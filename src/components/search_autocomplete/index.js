import React, {Component} from 'react';

import Tag from '../tag';

import './styles.scss'

class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tags: [],
      cursor: -1,
      inputBlank: true,
      searchTerm: ''
    }
  }

  sortAlphabetically = (a, b) => {
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  }

  filterData = (filterValue) => {
    const {tags} = this.state;
    let filteredData;
    const matchedData = [];
    const othersData = [];
    let finalSortedData = [];

    if(tags.length) {
      filteredData = this.props.data.filter(item => !tags.includes(item.name.toLowerCase()));
      filteredData = filteredData.filter(item => item.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
    } else {
      filteredData = this.props.data.filter(item => item.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
    }

    for (var i = 0; i < filteredData.length; i++) {
      if (filteredData[i].name.toLowerCase().indexOf(filterValue.toLowerCase()) === 0) {
          matchedData.push(filteredData[i]);
      } else {
          othersData.push(filteredData[i]);
      }
    }

    matchedData.sort(this.sortAlphabetically);
    othersData.sort(this.sortAlphabetically);
    finalSortedData = [...matchedData, ...othersData];
    return finalSortedData;
  }

  handleSearch = (e) => {
    const {cursor, data, tags, searchTerm, inputBlank} = this.state;
    let inputValue = e.target.value;
    let filteredData = this.filterData(inputValue);

    if (e.keyCode === 13 || e.keyCode === 188) {
      if(inputValue.trim()) {
        this.setState({ searchTerm: "", cursor: -1 });
        if (cursor < 0) {
          this.setState({ tags: [...tags, inputValue.toLowerCase().split(',').join('')] });
          console.log(tags);
        } else if (cursor >= 0) {
          this.setState({ tags: [...tags, data[cursor].name.toLowerCase()] });
        }
      }
    } else if (e.keyCode === 38 && cursor >= -1) {
      this.setState({ cursor: cursor - 1 });
    } else if (e.keyCode === 40 && cursor < data.length - 1) {
      this.setState({ cursor: cursor + 1 });
    } else if (cursor > -1 && e.keyCode !== 38 && e.keyCode !== 40) {
      this.setState({ searchTerm: inputValue, cursor: -1 });
    } else if (tags.length && inputBlank && e.keyCode === 8 ) {
      const updatedTags = tags;
      updatedTags.splice(-1,1);
      this.setState({ tags: updatedTags });
    } else {
      this.setState({ searchTerm: inputValue, data: filteredData });
    }

    if (!searchTerm.length) {
      this.setState({ inputBlank: true });
    } else {
      this.setState({ inputBlank: false });
    }
  }

  handleClick = (e) => {
    const { tags } = this.state;
    let clickedValue = e.target.innerText;
    this.filterData(clickedValue);
    this.setState({ searchTerm: "", tags: [...tags, clickedValue.toLowerCase()] });
  }

  handleRemoveTag = (removedTagIndex) => {
    const {tags} = this.state;
    const updatedTags = tags.filter((item, index) => index !== removedTagIndex);
    this.setState({tags: updatedTags});
  }

  render() {
    const {cursor, data, tags} = this.state;
    const searchTermLength = this.state.searchTerm.trim().length;
    return (
      <React.Fragment>
        <h3 className="page-heading">Search Autocomplete with tags</h3>
        <section className="search">
          <section className="search__input-wrapper">
            {tags.map((item, index) => <Tag tagName={item} index={index} handleRemoveTag={this.handleRemoveTag}/>)}
            <input type="text" placeholder="search" value={this.state.searchTerm} onChange={this.handleSearch} onKeyUp={this.handleSearch} />
          </section>
          { searchTermLength > 0 && data.length > 0 &&
            <ul className="search__suggestions">
              {data.map((item, index) => <li className={`search__suggestions__item ${ cursor === index ? 'active' : ''}`} key={index} onClick={this.handleClick}>{item.name}</li>)}
            </ul>
          }
        </section>
      </React.Fragment>
    )
  }
}

export default SearchAutocomplete;