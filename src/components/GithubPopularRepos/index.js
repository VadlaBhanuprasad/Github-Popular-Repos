import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

let storeRenderPage
// Write your code here
const stateDetails = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loader: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {activeLanguage: 'ALL', reposData: [], status: stateDetails.initial}

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeLanguage} = this.state
    this.setState({status: stateDetails.loader})
    const {reposData} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const updatedReposData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({reposData: updatedReposData, status: stateDetails.success})
    }
    if (response.status === 401) {
      this.setState({status: stateDetails.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryContainer = () => {
    const {reposData} = this.state
    return (
      <ul className="repository-list-container">
        {reposData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repository={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-image"
      />
      <h1 className="something-went-wrong">Something Went Wrong</h1>
    </div>
  )

  displayLanguageCategory = id => {
    this.setState({activeLanguage: id}, this.getPopularRepos)
  }

  render() {
    const {reposData, status, activeLanguage} = this.state

    switch (status) {
      case stateDetails.success:
        storeRenderPage = this.renderRepositoryContainer()
        break
      case stateDetails.loader:
        storeRenderPage = this.renderLoader()
        break
      case stateDetails.failure:
        storeRenderPage = this.renderFailure()
        break
      default:
    }
    return (
      <div className="container">
        <div className="page-container">
          <h1 className="popular">Popular</h1>

          <ul className="filter-buttons-list">
            {languageFiltersData.map(button => (
              <LanguageFilterItem
                displayRepo={this.displayLanguageCategory}
                filterButtons={button}
                key={button.id}
                activeButton={activeLanguage === button.id}
              />
            ))}
          </ul>
          {storeRenderPage}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
