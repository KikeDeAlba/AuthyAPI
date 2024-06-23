import { describe, expect, it } from "vitest";

describe('Account', () => {
    const user = {
        email: `${Math.floor(100000 + Math.random() * 900000)}@test.com`,
        password: '12345678',
        payload: {
            test: 'test'
        },
        businessCode: '12345678'
    }
    let token = ''
    let refreshToken = ''

    it('should create a new account', async () => {
        const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json();
        console.log(data);
        token = data.token;
        refreshToken = data.refreshToken;

        expect(res.status).toBe(200);
    })

    it('should validate the account', async () => {
        const res = await fetch('http://localhost:3000/auth/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        })

        const data = await res.json();
        console.log(data);

        expect(res.status).toBe(200);
    })

    it('should refresh the account', async () => {
        const res = await fetch('http://localhost:3000/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken
            })
        })

        const data = await res.json();
        console.log(data);

        token = data.token;
        refreshToken = data.refreshToken;

        expect(res.status).toBe(200);
    })

    it('should generate a new token with login', async () => {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json();
        console.log(data);

        expect(res.status).toBe(200);
    })
})