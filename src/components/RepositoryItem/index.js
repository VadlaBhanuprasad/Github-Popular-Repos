// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repository} = props
  const {avatarUrl, id, forksCount, name, starsCount, issuesCount} = repository
  return (
    <li className="repo-card">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-details-container">
        <div className="div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="image"
          />
          <p className="image-label">{starsCount} stars</p>
        </div>
        <div className="div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="image"
          />
          <p className="image-label">{forksCount} forks</p>
        </div>
        <div className="div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="image"
          />
          <p className="image-label">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
