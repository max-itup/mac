// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {loadCategories} from '../redux/actions';

// Device detect
import {isMobile} from "react-device-detect";

// Notifications
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Components
import Categories from '../components/categories';
import Contents from '../components/contents';
import Script from '../components/script';
import Loading from '../components/loading';
import Error from '../components/error';
import Mobile from '../components/mobile';
import Download from '../components/download';
import Footer from '../components/footer';

// PWA
import * as serviceWorker from '../serviceWorker';

// Helpers
import {arrayFromObject, objectFromArray} from '../utils';

class App extends Component {
  constructor(props) {
    super(props);

    serviceWorker.register({
      onUpdate: this.handleServiceWorkerUpdate
    });

    this.state = {
      is_loading: true,
      error: null,
    };

    this.fetchData();
  }

  handleServiceWorkerUpdate() {
    // Clear IndexDB
    indexedDB.webkitGetDatabaseNames().onsuccess = (event) => {
      Array.prototype.forEach.call(event.target.result, indexedDB.deleteDatabase.bind(indexedDB));
    }

    // Clear Coockies
    document.cookie.split(";").forEach((c) => { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    
    // Clear LocalStorage
    window.localStorage.clear();

    const message = 'New content is available, refresh the page to apply changes';
    toast.info(message, {
      position: "top-right",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      });
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
      <Footer key='footer'/>,
      <ToastContainer key='notifications'/>,
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
