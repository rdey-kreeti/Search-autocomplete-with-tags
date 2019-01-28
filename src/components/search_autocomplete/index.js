import React, {Component} from 'react';

import Tag from '../tag';

import './styles.scss'

class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tags: [],
      searchTerm: ''
    }
  }

  handleSearch = (e) => {
    const inputValue = e.target.value;
    const filteredData = this.props.data.filter(item => item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
    if (e.keyCode === 13 || e.keyCode === 188) {
      console.log('enter');
      if(inputValue.trim()) {
        this.setState({searchTerm: "", tags: [...this.state.tags, inputValue.toLowerCase().split(',')]}, () => console.log(this.state.tags));
      }
    } else {
      this.setState({searchTerm: inputValue, data: filteredData});
    }
  }

  handleRemoveTag = (removedTagIndex) => {
    console.log(removedTagIndex);
    const updatedTags = this.state.tags.filter((item, index) => index !== removedTagIndex);
    this.setState({tags: updatedTags});
  }

  render() {
    const searchTermLength = this.state.searchTerm.trim().length;
    return (
      <section className="search">
        <section className="search__input-wrapper">
          {this.state.tags.map((item, index) => <Tag tagName={item} index={index} handleRemoveTag={this.handleRemoveTag}/>)}
          <input type="text" placeholder="search" value={this.state.searchTerm} onChange={this.handleSearch} onKeyUp={this.handleSearch} />
        </section>
        { searchTermLength > 0 &&
          <ul className="search__suggestions">
            {this.state.data.map((item, index) => <li className="search__suggestions__item" key={index}>{item.name}</li>)}
          </ul>
        }
      </section>

    )
  }
}

export default SearchAutocomplete;