import { MAIN_API } from '../constants';

export class UserController {
  async getUserData (token: string, callback?: (json: any) => void) {
    await fetch(MAIN_API + `/api/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (callback) callback(json)
    })
  }
}