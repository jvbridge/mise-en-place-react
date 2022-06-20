import jwtDecode, { JwtPayload } from 'jwt-decode';

class AuthService {
  /**
   * @returns profile of the current logged in use, undefined if not logged in
   */
  getProfile() {
    const token = this.getToken();
    if (token) return jwtDecode<JwtPayload>(token);
  }

  /**
   * @returns if the user is logged in
   */
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  /**
   * Checks experiation of token, if it's expired also removes it from local
   * storage
   * @param token json web token
   * @returns true if expired, false
   */
  isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    // decoded token expired if not encoded properly
    if (!decoded.exp || decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  /**
   * @returns token if in local storage
   */
  getToken() {
    return localStorage.getItem('id_token');
  }

  /**
   * Adds the token to local storage and then sends us to the home location
   * @param idToken json web token
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
