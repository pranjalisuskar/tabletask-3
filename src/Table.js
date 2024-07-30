import React, { useEffect, useState } from 'react'
import './Table.css';

export const Table = () => {
  const [getData, setGetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setGetData(data.users);
        setFilteredData(data.users); 
        console.log(data.users); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setSelectedGender(value);
    filterData(value, selectedCountry);
  };

  const handleCountryChange = (event) => {
    const value = event.target.value;
    setSelectedCountry(value);
    filterData(selectedGender, value);
  };

  const filterData = (gender, country) => {
    let filtered = getData;
    if (gender !== '') {
      filtered = filtered.filter(user => user.gender === gender);
    }
    if (country !== '') {
      filtered = filtered.filter(user => user.address?.country === country);
    }
    setFilteredData(filtered);
  };

  const uniqueGenders = Array.from(new Set(getData.map(user => user.gender)));








  return (
 <div className="container">
    <br></br>
  <div>
  <div className="container-fluid">
  <div className="row align-items-center">
    <div className="col-md-3">
      <h1>Employee</h1>
    </div>
    <div className="col-md-3 text-center">
      <i className="fas fa-highlighter" style={{ fontSize: 20, color: 'red' }} />
    </div>
    <div className="col-md-3">
    <select
        name="gender"
        id="gender-select"
        className="custom-select"
        onChange={handleGenderChange}
        value={selectedGender}
      >
        <option value="">--Select Gender--</option>
        {uniqueGenders.map((gender, index) => (
          <option key={index} value={gender}>
            {gender}
          </option>
        ))}
      </select>
    </div>
    <div className="col-md-3">
      <select
        name="country"
        id="country-select"
        className="custom-select"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">--Select Country--</option>
        {getData.map((user, index) => (
          <option key={index} value={user.address?.country}>
            {user.address?.country}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>

  <br></br>
  <table role="table" className="align-middle table-nowrap table table-hover">
  <thead>
    <tr>
      <th className="center-content">Id</th>
      <th className="center-content">Image</th>
      <th className="center-content">Full Name</th>
      <th className="center-content">Demography</th>
      <th className="center-content">Designation</th>
      <th className="center-content">Location</th>
    </tr>
  </thead>
  <tbody>
  {filteredData.slice(0, 11).map((item, index) => (
  <tr key={index}>
    <td className="center-content">{item.id}</td>
    <td className="center-content">
      <img src={item.image} alt="User" />
    </td>
    <td className="center-content">
      {`${item.firstName} ${item.maidenName ? item.maidenName + ' ' : ''}${item.lastName}`}
    </td>
    <td className="center-content">
      {item.address ? item.address.stateCode : 'No state'}
    </td>
    <td className="center-content">
      {item.company ? (
        <span>
          {item.company.department}
        </span>
      ) : (
        'No company'
      )}
    </td>
    <td className="center-content">
      {item.address ? (
        <span>
          {item.address.state}
        </span>
      ) : (
        'No address'
      )}
    </td>
  </tr>
))}

</tbody>

</table>

</div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</div>




  )
}
