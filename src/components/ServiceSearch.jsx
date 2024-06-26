import React, { useState } from 'react';
import { ServiceCost } from '../constants';

const ServiceSearch = () => {
  const branchSearch = ServiceCost.find(branch => branch.braName === 'Shantinagar');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = branchSearch?.services?.flatMap(category =>
      category.items.filter(service =>
        service.serviceName.toLowerCase().includes(query)
      )
    );
  
    // If the query is empty, set filteredServices to an empty array
    setFilteredServices(query ? filtered || [] : []);
    setSearchQuery(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by service name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredServices.map(service => (
          <li key={service.serviceId}>
            {service.serviceName} - Price: {service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSearch;