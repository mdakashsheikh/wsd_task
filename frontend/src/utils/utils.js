export function saveJWTToken(jwtToen) {
    window.localStorage.setItem('jwt_token', jwtToen);
}

export function getJWTToken() {
    return window.localStorage.getItem('jwt_token');
}

export function deleteJWTToken() {
    window.localStorage.removeItem('jwt_token');
}