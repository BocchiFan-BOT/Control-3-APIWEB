import citiesRepository from '../repository/worldCitiesRespository'

const validateCountry = (country) => {
    if (country.length < 3) {
        return { status: 400, body: { message: "El país ingresado debe tener al menos 3 caracteres" } };
    }
    if (/[^a-zA-Z]/.test(country)) {
        return { status: 400, body: { message: "Solo se aceptan caracteres no numéricos" } };
    }
    return null;
}

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    const validationError = validateCountry(ctx.params.country);
    if (validationError) {
        ctx.status = validationError.status;
        ctx.body = validationError.body;
        return ctx;
    }

    const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    if (cities.length === 0) {
        ctx.status = 200;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
    } else {
        ctx.status = 200;
        ctx.body = cities;
    }
    return ctx;
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    return ctx
}