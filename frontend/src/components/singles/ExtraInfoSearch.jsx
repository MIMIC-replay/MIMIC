const ExtraInfoSearch = ({activeTab, setSearchInput}) => {

  let placeHolder
  if (activeTab === 'Network') placeHolder = 'Search network events by target URL'
  else if (activeTab === 'Logs') placeHolder = 'Search log by content'
  else placeHolder === 'Search errors by trigger trace'

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input 
        type="text" 
        placeholder={placeHolder}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
    </>
  )
}

export default ExtraInfoSearch