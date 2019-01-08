import * as statics from './statics';

/**
 * Create an object from a given array
 */
export function objectFromArray(arr, key = 'id') {
    if (arr && arr.length) {
      return arr.reduce((v, i) => {
        v[i[key]] = i;
        return v;
      }, {});
    }
    return {};
  }
  
  /**
   * Create an array from a given object
   */
  export function arrayFromObject(obj, key = 'id') {
    return Object.keys(obj).map(key => (obj[key]));
  }

  export function generateScript(itemsArray) {
    if (itemsArray.length === 0) {
      return "";
    }
    let cask_items = [];
    let brew_items = [];
    let gem_items = [];
    let os_settings_items = [];

    itemsArray.forEach(item => {
      if (item.type === 'cask') {
        cask_items.push(item);
      } else if (item.type === 'brew') {
        brew_items.push(item);
      } else if (item.type === 'gem') {
        gem_items.push(item);
      } else if (item.category === 'os_settings') {
        os_settings_items.push(item);
      }
    });
    
    var script = statics.main;
    script = script.replace('{{CASKS}}', statics.casks(cask_items));
    script = script.replace('{{PACKAGES}}', statics.brew(brew_items));
    script = script.replace('{{GEMS}}', statics.gems(gem_items));
    script = script.replace('{{OS_SETTINGS}}', statics.os_settings(os_settings_items));
    return script;
  }

  export function getSelectedItems(dataObject) {
    const data = arrayFromObject(dataObject).sort((c1, c2) => (c1.order - c2.order));

    let items = []
    
    data.forEach(category => {
      let children = category.children;
      children = arrayFromObject(children);
      children.forEach(child => {
        if (child.is_selected) {
          items.push(child);
        }
      });
    });

    return items;
  }