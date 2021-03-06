'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { setKeyAct } from '../../actions/dataActions';
import { toggleEditDetailsAct } from '../../actions/uiActions';
import { watchLaterAct, recommAct, commentAct, delCommentAct } from '../../actions/detailsActions';
import Details from './details';

class SearchDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  render() {
    const key = this.props.dataState.key;

    return (
      <Details dataRef={this.props.dataState.search[key]} isSearch={true} />
    )
  }
}

const mapStateToProps = (store: any) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetails);