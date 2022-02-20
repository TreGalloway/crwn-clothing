import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-Preview.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import { CollectionsOverviewContainer } from './collections-overview.styles';

function CollectionsOverview({ collections }) {
  return (
  <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
  </CollectionsOverviewContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
