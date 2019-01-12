// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {loadCategories, loadItem} from '../redux/actions';

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

import {arrayFromObject} from '../utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_loading: true,
      error: null,
    };

    this.fetchData();
  }

  fetchData() {
    const url = 'https://raw.githubusercontent.com/max-itup/content/master/mac/data.json'
    fetch(url)
      .then(response => response.json())
      .then(json => {
        let categories = json.categories;
        categories.forEach(c => {
          c.children = [];
          c.count = 0;
          c.selected_count = 0;
        });
        this.props.loadCategories(categories);
        const count = json.items.length;
        json.items.forEach((item, index) => {
          if ((count - index) <= 1) {
            this.setState({
              is_loading: false,
            })
          }
          this.props.loadItem({item});
        });
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
      <Script key='script' script={script.script}/>,
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
    loadItem: item => dispatch(loadItem(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
