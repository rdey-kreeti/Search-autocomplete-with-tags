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
      searchTerm: ''
    }
  }

  handleSearch = (e) => {
    const {cursor, data, tags} = this.state;
    let inputValue = e.target.value;
    let filteredData;
    if(tags.length) {
      filteredData = this.props.data.filter(item => !tags.includes(item.name.toLowerCase()));
      filteredData = filteredData.filter(item => item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
    } else {
      filteredData = this.props.data.filter(item => item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
    }

    if (e.keyCode === 13 || e.keyCode === 188) {
      if(inputValue.trim()) {
        this.setState({searchTerm: "", cursor: -1});
        if (cursor < 0) {
          this.setState({tags: [...tags, inputValue.toLowerCase().split(',').join()]});
        } else if (cursor >= 0) {
          this.setState({tags: [...tags, data[cursor].name.toLowerCase().split(',').join()]});
        }
      }
    } else if (e.keyCode === 38 && cursor >= -1) {
      this.setState({cursor: cursor - 1});
    } else if (e.keyCode === 40 && cursor < data.length - 1) {
      this.setState({cursor: cursor + 1});
    } else if (cursor > -1 && e.keyCode !== 38 && e.keyCode !== 40) {
      this.setState({searchTerm: inputValue, cursor: -1});
    } else if (tags.length && !inputValue.length && e.keyCode === 8 ) {
      const updatedTags = tags;
      updatedTags.splice(-1,1);
      this.setState({tags: updatedTags});
    } else {
      this.setState({searchTerm: inputValue, data: filteredData});
    }
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
      <section className="search">
        <section className="search__input-wrapper">
          {tags.map((item, index) => <Tag tagName={item} index={index} handleRemoveTag={this.handleRemoveTag}/>)}
          <input type="text" placeholder="search" value={this.state.searchTerm} onChange={this.handleSearch} onKeyUp={this.handleSearch} />
        </section>
        { searchTermLength > 0 &&
          <ul className="search__suggestions">
            {data.map((item, index) => <li className={`search__suggestions__item ${ cursor === index ? 'active' : ''}`} key={index}>{item.name}</li>)}
          </ul>
        }
      </section>

    )
  }
}

export default SearchAutocomplete;