import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../api";

export default function InputSelector({ country, handleCountryChange }) {

	const [countries, setCountries] = useState([]);
	
	useEffect(() => {
		const getCountriesFromApi = async () => {
			const data = await fetchCountries();
			setCountries(data);
		}

		getCountriesFromApi();
	}, [setCountries])
  return (
	<FormControl>
		<NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
			<option value="">Global</option>
			{countries.map((country, index) => (<option value={country.name} key={index}>{country.name}</option>))}
		</NativeSelect>
	</FormControl>
  );
}
