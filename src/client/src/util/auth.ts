import jwtDecode, { JwtPayload } from 'jwt-decode';

class AuthService {
  /**
   * Gets the current profile of the logged in use, if not logged in returns
   * undefined
   * @returns
   */
  getProfile() {
    const token = this.getToken();
    if (token) return jwtDecode<JwtPayload>(token);
  }

  /**
   * Returns if the user is logged in or not
   * @returns
   */
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  /**
   * Checks experiation of token
   * @param token json web token
   * @returns
   */
  isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    // decoded token expired if not encoded properly
    if (!decoded.exp) return false;

    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  /**
   * Gets the token from local storage
   * @returns
   */
  getToken() {
    return localStorage.getItem('id_token');
  }

  /**
   * Gets the local storage logged in item
   * @param idToken
   */
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  /**
   * Destroys the local storage logged in item and reloads the client to prevent
   * problems
   */
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
