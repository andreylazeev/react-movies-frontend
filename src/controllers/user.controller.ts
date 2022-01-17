import { MAIN_API } from '../constants';
import { Dictionary } from '../interfaces';

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

  async writeMovie (token: string, body: Dictionary<any>, callback?: (json?: any) => void) {
    await fetch(MAIN_API + `/api/movies/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body || {})
    }).then(res => res.json()).then(json => {
      if (callback) callback(json)
    })
  }
}