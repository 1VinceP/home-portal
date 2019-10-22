import { Model } from '@vuex-orm/core';
import User from './User';

export default class Reward extends Model {
  static entity = 'rewards';

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      image: this.attr(''),
      description: this.attr(''),
      user: this.belongsTo(User, 'userId'),
    };
  }
}
