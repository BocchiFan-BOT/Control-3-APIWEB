import request from 'supertest';
import { server, app } from '../../../src/index';

afterAll(() => {
    server.close();
});

describe('GET /api/cities/by_country/:country', () => {
    test('should return cities for a valid country', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Chile');
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return message for non-existent country', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/PapuLandia');
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });
    });

    test('should return 400 for country with non-alphabetic characters', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Ch1l3');
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
    });

    test('should return 400 for country with less than 3 characters', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/ch');
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'El país ingresado debe tener al menos 3 caracteres' });
    });
});


