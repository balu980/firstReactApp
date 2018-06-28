import React from "react"
import { connect } from "react-redux"
import {bindActionCreators} from 'redux'
import Time from 'react-time'
import { fetchGit } from "../actions/fetchActions"


class Layout extends React.Component {

    constructor(props) {
        super(props);

        this.fetchgit = this.fetchgit.bind(this);

        this._text = {
            languagePlaceHolder: "language",
            topicplaceHolder:"topic"
        }
    }

    fetchgit() {
        var sQuerry = {
            lang  : this.refs.searchTextLang.value,
            topic : this.refs.searchTextTopic.value
        }

        this.props.actions(sQuerry)
    }

    renderStat(stat) {
        let now = new Date(stat.updated_at.split("T")[0])

        return (
            <li key={stat.name} >
                <img className="user-info__avatar" src={stat.owner.avatar_url} alt={stat.name} />
                <div className="project_name">
                    {stat.full_name}
                </div>
                <div className="information">Open Issues count : {stat.open_issues_count}</div>
                <div className="information">watchers : {stat.watchers_count}</div>

                <div className="information">Last Updated : <Time value={now} format="MMM DD YYYY" /> </div>

            </li>
        );
    }

    render() {
        const  gits = this.props.gitProject;

        if (Array.isArray(gits) && !gits.length) {
            return (
                <div>
                    <span ref="projectSearchContainer" >

                        <input ref="searchTextLang" placeholder={this._text.languagePlaceHolder} className="search-page__input" type="text" />

                        <input ref="searchTextTopic" placeholder={this._text.topicplaceHolder} className="search-page__input" type="text" />

                    </span>
                    <div ref="buttonSearchContainer" >
                        <button onClick={this.fetchgit.bind(this)} className="search-page__button">Search</button>
                    </div>
                </div>
            )
        }
        return (
            <div className="box">
                <h3 className="box_header">Repositories - {gits.total_count}</h3>
                <ul className="project_list">
                {gits.items.map((this.renderStat))}
                </ul>
            </div>
        )
    }
}



export default connect(state => ({
        gitProject: state.gits
    }),
    (dispatch) => ({
        actions: bindActionCreators(fetchGit, dispatch)
    })
)(Layout)