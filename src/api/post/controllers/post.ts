/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async update(ctx) {
    const { id } = ctx.params

    const entity = await strapi.db.query('api::post.post').findOne({
      where: { id, users_permissions_user: { id: ctx.state.user.id } }
    });

    if (!entity) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const { data } = ctx.request.body as any

    // create(post)
    // update(put)沒有檔案
    // const files = ctx.request.files as any

    const parseData = JSON.parse(data)

    const entry = await strapi.entityService.update('api::post.post', id, {
      data: { ...parseData },

      // create(post)
      // update(put)沒有檔案
      // files: {
      //   banner: files['files.banner'],
      //   gallery: files['files.gallery'],
      // },
    })

    const sanitizedEntity = await this.sanitizeOutput(entry, ctx)

    return this.transformResponse(sanitizedEntity)
  },
}));
