import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const MarketNavBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log('Searching for:', searchTerm);
  // };

  return (
    <div
      className="forum-bar"
      style={{
        backgroundColor: '#DFEFCD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        marginTop: '20px'
      }}
    >
      <h1 style={{ fontFamily: 'baloo', fontSize: '54px', margin: 0 }}>
        Farmers Market
      </h1>
      <form style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          style={{
            marginRight: '10px',
            width: '250px',
            height: '50px',
            textAlign: 'center',
            borderRadius: '20px',
            backgroundColor: '#C9D7C9',
            placeholder: { color: 'black' },
          }}
        />
        <button
          type="submit"
          style={{ background: 'transparent', border: 'none' }}
        >
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  )
}

export default MarketNavBar
