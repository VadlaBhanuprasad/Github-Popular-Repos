// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterButtons, displayRepo, activeButton} = props
  const {id, language} = filterButtons

  const showCategory = () => {
    displayRepo(id)
  }

  const activeButtonStyle = activeButton ? 'active-button' : 'button'
  return (
    <li className="filter-button">
      <button
        type="button"
        onClick={showCategory}
        className={`button ${activeButtonStyle}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
