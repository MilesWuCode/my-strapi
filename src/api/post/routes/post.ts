/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post', {
  prefix: '',
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [
        // 'global::is-authenticated'
      ],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {
      policies: [
        'api::post.is-owner'
      ]
    },
    delete: {},
  },
});
