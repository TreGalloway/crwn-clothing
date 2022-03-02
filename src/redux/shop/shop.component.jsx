import React ,{useEffect} from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';


import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';


const ShopPage = ({ fetchCollectionsStart, match }) => {
  const dispatch = useDispatch();
  const fetchCollectionsStartHandler = dispatch(fetchCollectionsStart());
  useEffect(() => {
    fetchCollectionsStartHandler();
  }, [fetchCollectionsStartHandler]);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

export default ShopPage;