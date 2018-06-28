import React from "react"
import { connect } from "react-redux"
import {bindActionCreators} from 'redux'
import Time from 'react-time'
import { fetchGitProject, fetchGitCode } from "../actions/fetchActions"


class Layout extends React.Component {

    constructor(props) {
        super(props);


    //todo: to move to an i18n state
        this._text = {
            textPlaceHolder: "text",
            languagePlaceHolder: "language",
            topicPlaceHolder:"topic",
            repoPlaceHolder:"repo"
        }
    }

    /**
     * function to call the fetch method to search Project
     */
    fetchGitProject() {
        //todo: move this to the state and use it from there.
        var sQuerry = {
            text : this.refs.searchText.value,
            lang  : this.refs.searchTextLang.value,
            topic : this.refs.searchTextTopic.value
        }

        this.props.fetchGitProject(sQuerry)
    }
    /**
     * function to call the fetch method to search Project's code
     */
    fetchGitCode() {
        //todo: move this to the state and use it from there.
        var sQuerry = {
            text : this.refs.searchText.value,
            lang  : this.refs.searchTextLang.value,
            topic : this.refs.searchTextTopic.value
        }

        this.props.fetchGitCode(sQuerry)
    }


    /**
     * function that will repeated to render the git project details
     * @param stat each project item
     * @returns {*}
     */
    renderStat(stat) {
        let now = ""
        if(stat && stat.updated_at){
            now = new Date(stat.updated_at.split("T")[0])
        }
        let informationText =  ""
        if(now !== ""){
            informationText =    <span>
                        <div className="information">Open Issues count : {stat.open_issues_count}</div>
                        <div className="information">watchers : {stat.watchers_count}</div>
                        <div className="information">Last Updated : <Time value={now} format="MMM DD YYYY" /> </div>
                    </span>

        } else{
            informationText = <span>
                        <div className="information">Path : {stat.url}</div>
                        <div className="information">Score : {stat.score}</div>
                    </span>

        }

        return (
            <li key={stat.name} >
                <img className="user-info__avatar" src={stat.owner ? stat.owner.avatar_url : stat.repository.owner.avatar_url} alt={stat.name} />
                <div className="project-name">
                    {stat.full_name ? stat.full_name : stat.path}
                </div>
                {informationText}
            </li>
        );
    }

    render() {

        const  gits = this.props.gitProject;
        //render the search form when there is no data
        if (!gits || gits.errors) {
            let errorMsg = "";
            if(gits && gits.errors){
                errorMsg = <div className='errorMsg'> <h4>{gits.message}</h4><div>{gits.errors[0].message} </div> </div>
            }
            return (
                <div>
                    {errorMsg}
                    <span ref="projectSearchContainer" >
                        <input ref="searchText" placeholder={this._text.textPlaceHolder} className="search-page__input" type="text" />
                        <input ref="searchTextLang" placeholder={this._text.languagePlaceHolder} className="search-page__input" type="text" />
                        <input ref="searchTextTopic" placeholder={this._text.topicPlaceHolder} className="search-page__input" type="text" />
                        <input ref="searchTextTopic" placeholder={this._text.repoPlaceHolder} className="search-page__input" type="text" />
                    </span>
                    <div ref="buttonSearchContainer" >
                        <button onClick={this.fetchGitProject.bind(this)} className="search-page__button">Search Projects</button>
                        <button onClick={this.fetchGitCode.bind(this)} className="search-page__button">Search Code</button>
                    </div>
                </div>
            )
        }

        // render the result list
        // todo:  create a goback logic to return to the search page.
        return (
            <div className="box">
                <h3 className="box-header">Repositories - {gits.total_count}</h3>
                <ul className="project-list">
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
        fetchGitProject: bindActionCreators(fetchGitProject,dispatch),
        fetchGitCode : bindActionCreators(fetchGitCode, dispatch)
    })
)(Layout)