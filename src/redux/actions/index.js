// Action types
import * as types from './types';

/**
 * Action Creators
 */
export function loadCategories(categories) {
    return {
        type: types.LOAD_CATEGORIES,
        categories,
    };
}

export function toggleItemSelection({item}) {
    return {
        type: types.TOGGLE_ITEM_SELECTION,
        item,
    };
}

export function loadScript(script) {
    return {
        type: types.LOAD_SCRIPT,
        script,
    };
}
