'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { setKeyAct } from '../../actions/dataActions';
import { toggleEditDetailsAct } from '../../actions/uiActions';
import { watchLaterAct, recommAct, commentAct, delCommentAct } from '../../actions/detailsActions';
import EditDetails from './editDetails';

interface IReduxProps extends React.Props<any> {
  loginState: any,
  dataState: any,
  uiState: any,
  watchLaterDispatch: any,
  recommDispatch: any,
  commentDispatch: any,
  delCommentDispatch: any,
  editDetailsDispatch: any
}

interface ICompProps extends React.Props<any> {
  dataRef: any,
  isSearch: boolean
}

class Details extends React.Component<IReduxProps & ICompProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      opts: false,
      recomm: false,
      title: '',
      comment: '',
      showComment: false
    }
  }

  toggleRecomm() {
    this.setState({ recomm: !this.state.recomm });
  }

  commentFocus() {
    this.setState({ showComment: true });
  }

  cancelComment() {
    this.setState({ title: '', comment: '', showComment: false });
  }

  titleChange(e: any) {
    this.setState({ title: e.target.value });
  }

  commentChange(e: any) {
    this.setState({ comment: e.target.value });
  }

  submitComment() {
    if (this.state.title && this.state.comment) {
      let t = new Date();
      this.props.commentDispatch({
        [t.getTime()]: {
          time: t.getFullYear() + '.' + (t.getMonth() + 1) + '.' + t.getDate(),
          title: this.state.title,
          txt: this.state.comment,
          user: this.props.loginState.user
        }
      });
      this.cancelComment();
    }
  }

  render() {
    const { loginState, dataState, uiState } = this.props;
    const key = this.props.dataState.key;
    const { opts, recomm, showComment } = this.state;
    const item = this.props.dataRef;

    if (Object.keys(dataState.buffer).length) {
      return (
        <div>
          <div className="video-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A' ?
                <img alt="Poster" src={item.poster} /> :
                <div className={'dummy-poster poster-' + item.cat.toLowerCase()}></div>}
            </div>

            <div className="info">
              <span className="title">{item.engTitle}</span>
              <span className="orig-title">
                {item.origTitle === 'N/A' || item.engTitle === item.origTitle ?
                  '' : item.origTitle + ' (original title)'}
              </span>
              <span className="misc">
                Year: {item.year}<br />
                Runtime: {item.runtime || 'N/A'}<br />
                {item.director ? 'Director: ' + (item.director || 'N/A') : 'Creator: ' + (item.creator || 'N/A')}<br />
                Stars: {item.stars || 'N/A'}
              </span>
              <div className="actions">
                <div className="watch-later" title="Watch later" onClick={e => this.props.watchLaterDispatch()}></div>
                <div className="recomm" title="Recommend to friends" onClick={e => this.toggleRecomm()}></div>
                <div className="edit" title="Edit details" onClick={e => this.props.editDetailsDispatch(true, false)}></div>
                <a target="_blank" title="Search for subtitles on Subscene" href={'https://subscene.com/subtitles/title?q=' + item.engTitle.replace(' ', '+')}></a>
                {recomm && <ul>
                  {Object.keys(loginState.friends).map((user: string) => {
                    return <li key={user} onClick={e => this.props.recommDispatch(user)}>{loginState.friends[user]}</li>
                  })}
                </ul>}
              </div>
            </div>

            <div className="plot">
              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a className="imdb" target="_blank" title="Search on IMDB" href={item.imdb_id ?
                  'http://www.imdb.com/title/' + item.imdb_id :
                  'https://www.imdb.com/find?ref_=nv_sr_fn&q=' + item.engTitle.replace(' ', '+')}></a>
                <a className="douban" target="_blank" title="Search on Douban" href={item.douban ?
                  'https://movie.douban.com/subject/' + item.douban :
                  'https://movie.douban.com/subject_search?search_text=' + item.engTitle.replace(' ', '+')}></a>
                <a className="mtime" target="_blank" title="Search on Mtime" href={item.mtime ?
                  'http://movie.mtime.com/' + item.mtime :
                  'http://search.mtime.com/search/?q=' + item.engTitle}></a>
              </div>
            </div>
          </div>

          {item.trailer && <div>
            <h1>Trailer and featurette</h1>
            <div className="trailer">
              <iframe width="440" height="247.5" src={item.trailer} frameBorder="0" allowFullScreen></iframe>
              <iframe width="440" height="247.5" src={item.featurette} frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="youtube">
              <a target="_blank" href={'https://www.youtube.com/results?search_query=' + item.engTitle}>More videos on YouTube</a>
            </div>
          </div>}

          <h1>Comments</h1>

          <div className="add-comment">
            <input className={showComment ? "comment-title" : "comment-title-lt"} type="text" placeholder={showComment ? "Title" : "Add a public comment..."} value={this.state.title} onChange={e => this.titleChange(e)} onFocus={e => this.commentFocus()} />
            {showComment && <textarea placeholder="Add a public comment..." value={this.state.comment} onChange={e => this.commentChange(e)}></textarea>}
            {showComment && <div>
              <button className="btn-cancel" onClick={e => this.cancelComment()}>Cancel</button>
              <button className="btn-main" type="submit" onClick={e => this.submitComment()}>Comment</button>
            </div>}
          </div>

          {item.comments && Object.keys(item.comments).map((id: any) => {
            return <div className="comment" key={id}>
              <div className="title-row">
                {item.comments[id].user === loginState.user && <div className="del-comment" onClick={e => this.props.delCommentDispatch(id)}></div>}
                <div>
                  <h2>{item.comments[id].title}</h2>
                  <h4>{item.comments[id].time} by {item.comments[id].user}</h4>
                </div>
              </div>
              <span>{item.comments[id].txt}</span>
            </div>
          })}
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (store: any) => ({
  loginState: store.loginReducer,
  dataState: store.dataReducer,
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  watchLaterDispatch: () => dispatch(watchLaterAct()),
  recommDispatch: (user: string) => dispatch(recommAct(user)),
  commentDispatch: (values: any) => dispatch(commentAct(values)),
  delCommentDispatch: (id: string) => dispatch(delCommentAct(id)),
  editDetailsDispatch: (status: boolean, newRec: boolean) => dispatch(toggleEditDetailsAct(status, newRec))
});

export default connect<{}, {}, ICompProps>(mapStateToProps, mapDispatchToProps)(Details);