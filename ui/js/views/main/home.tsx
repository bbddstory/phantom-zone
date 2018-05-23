'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";

import { loadHomeListsAct } from '../../actions/homeActions';
import LatestDetails from './latestDetails';
import RecommDetails from './recommDetails';
import TileList from './tileList';
import SlidesList from './slidesList';

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.loadHomeListsDispatch()
  }

  render() {
    const { dataState } = this.props;

    return (
      <div className="home">
        <div className="home-section">
          <div className="latest">
            <h1><FormattedMessage id='home.latest' /></h1>
            <div className="latest-details-wrap">
              <LatestDetails />
            </div>
            <div className="latest-list">
              {Object.keys(dataState.latest).length ?
                <SlidesList dataRef={dataState.latest} open={true} load={true} vertical={false} del={false} info={false} dots={true} list="latest" ipp="6" />
                : <FormattedMessage id='home.empty' />}
            </div>
          </div>
          <div className="watch-later">
            <h1><FormattedMessage id='home.watch' /></h1>
            {Object.keys(dataState.watchLater).length ?
              <SlidesList dataRef={dataState.watchLater} open={false} load={false} vertical={true} del={true} info={true} dots={true} list="" ipp="4" />
              : <FormattedMessage id='home.empty' />}
          </div>
        </div>

        <div className="home-section">
          <div className="recomm">
            <h1><FormattedMessage id='home.recomm' /></h1>
            <div className="recomm-details-wrap">
              <RecommDetails />
            </div>
            <div className="recomm-list">
              {Object.keys(dataState.recomm).length ?
                <SlidesList dataRef={dataState.recomm} open={true} load={true} vertical={false} del={true} info={false} dots={true} list="recomm" ipp="8" />
                : <FormattedMessage id='home.empty' />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store: any) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  loadHomeListsDispatch: () => {
    dispatch(loadHomeListsAct())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
