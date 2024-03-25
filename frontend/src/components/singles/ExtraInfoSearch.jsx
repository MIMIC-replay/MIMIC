import SearchIcon from '../iconComponents/search'

const ExtraInfoSearch = ({activeTab, setSearchInput}) => {

  let placeHolder
  if (activeTab === 'Network') placeHolder = 'Search network events by target URL'
  else if (activeTab === 'Logs') placeHolder = 'Search logs by content'
  else placeHolder = 'Search errors by trigger trace'

  return (
    <>
      <SearchIcon />
      <input 
        className="extra-info-search-input"
        type="text" 
        placeholder={placeHolder}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
    </>
  )
}

export default ExtraInfoSearch