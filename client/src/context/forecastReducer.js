export default (state, action) => {
  switch (action.type) {
    case 'search_cities':
      return {
        ...state,
        city: action.payload.city,
        forecast: action.payload.list,
        loading: false,
      };
    case 'invalid_search':
      return {
        ...state,
        loading: false,
      };
    case 'add_clothing':
      return {
        ...state,
        clothing: [...state.clothing, ...action.payload],
      };
    case 'clear_data':
      return {
        ...state,
        city: {},
        dateRange: [],
        forecast: [],
        loading: true,
        clothing: [],
      };
    case 'set_loading':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
