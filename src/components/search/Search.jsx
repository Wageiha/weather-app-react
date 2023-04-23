import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { geoApiOptions, geoApiUrl } from "./api";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);
console.log("line7",search);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    console.log(inputValue);
    return fetch(
      `${geoApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error("Geo Fetch Error",err));
  };
console.log("line31",search);

  return (
    <AsyncPaginate
      placeholder="Search for city!"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

export default Search;
