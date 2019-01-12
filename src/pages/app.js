// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {loadCategories} from '../redux/actions';

// Device detect
import {isMobile} from "react-device-detect";

// Components
import Categories from '../components/categories';
import Contents from '../components/contents';
import Script from '../components/script';
import Loading from '../components/loading';
import Error from '../components/error';
import Mobile from '../components/mobile';
import Download from '../components/download';
import Footer from '../components/footer';

import {arrayFromObject, objectFromArray} from '../utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_loading: true,
      error: null,
    };

    this.fetchData();
  }

  loadData(data) {    
    let {categories, items} = data;

    categories.forEach(c => {
      c.count = 0;
      c.selected_count = 0;
      c.children = {};
    });
    
    categories = objectFromArray(categories);

    items.forEach(item => {
      item.is_selected = false;
      categories[item.category].count += 1;
      categories[item.category].children[item.id] = item;
    });

    categories = arrayFromObject(categories);
    this.props.loadCategories(categories);
    this.setState({
      is_loading: false,
    })
  }

  fetchData() {
    const url = 'https://raw.githubusercontent.com/max-itup/content/master/mac/data.json'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.loadData(data);
      }).catch(error => {
        this.setState({          
          error: error,
        })
      });
  }

  render() {
    if (isMobile) {
      return <Mobile/>
    }
    
    const {is_loading, error} = this.state;

    if (error) {
      return <Error error={error.toString()}/>;
    }
    
    if (is_loading) {
      return <Loading/>
    }

    let {data, script} = this.props.store;
    data = arrayFromObject(data).sort((c1, c2) => (c1.order - c2.order));

    return [
      <Categories key='categories' categories={data}/>,
      <Contents key='contents' data={data}/>,
      <Script key='script' script={script}/>,
      <Download key='download'/>,
      <Footer key='footer'/>
    ];
  }
}

function mapStateToProps(store) {
  return {store};
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: categories => dispatch(loadCategories(categories)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
