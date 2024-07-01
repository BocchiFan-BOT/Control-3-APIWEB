import citiesRepository from '../../../src/domain/cities/repository/worldCitiesRespository';
import worldCitiesDataset from '../../../dataset/world-cities_json.json';

describe('Cities Repository', () => {
    test('searchCitiesByCountryName should return cities for a valid country', () => {
        const country = 'Chile';
        const cities = citiesRepository.searchCitiesByCountryName(country);
        const expectedCities = worldCitiesDataset.filter(city => city.country === country);
        expect(cities).toEqual(expectedCities);
    });

    test('searchCitiesByCountryName should return empty array for a non-existent country', () => {
        const country = 'PapuLandia';
        const cities = citiesRepository.searchCitiesByCountryName(country);
        expect(cities).toEqual([]);
    });

    test('searchCityByCityNameAndCountry should return city for valid city and country', () => {
        const city = 'Iquique';
        const country = 'Chile';
        const cities = citiesRepository.searchCityByCityNameAndCountry(city, country);
        const expectedCities = worldCitiesDataset.filter(c => c.name === city && c.country === country);
        expect(cities).toEqual(expectedCities);
    });

    test('searchCityByCityNameAndCountry should return empty array for invalid city and country', () => {
        const city = 'PapuLandia';
        const country = 'PapuPro';
        const cities = citiesRepository.searchCityByCityNameAndCountry(city, country);
        expect(cities).toEqual([]);
    });
});
