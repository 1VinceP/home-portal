import { Model } from '@vuex-orm/core';

export default class User extends Model {
  static entity = 'users';

  static fields() {
    return {
      id: this.attr(null),
      username: this.attr(''),
      email: this.attr(''),
      points: this.attr(0),
      admin: this.attr(false),
      manager: this.attr(false),
    };
  }
}
