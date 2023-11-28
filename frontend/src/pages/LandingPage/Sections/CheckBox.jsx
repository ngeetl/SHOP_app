import React from 'react'

const CheckBox = ({ continents, checkedContinents, onFilters }) => {

  const handleToggle = (continentId) => {
    // 현재 누른 checkbox가 이미 체크가 되어 있었는지 체크
    const currentIndex = checkedContinents.indexOf(continentId);

    const newChecked = [...checkedContinents];

    if(currentIndex === -1) {
      newChecked.push(continentId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    onFilters(newChecked);
    console.log(continentId)

    console.log(newChecked)
  }

  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {continents?.map(continent => (
        <div key={continents._id}>
          <input 
            type='checkbox'
            onChange={() => handleToggle(continent._id)}/>{" "}
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox
