/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body as any

    const parseData = JSON.parse(data)

    const entry = await strapi.entityService.create('api::post.post', {
      data: { ...parseData, users_permissions_user: { id: ctx.state.user.id } },
    })

    const sanitizedEntity = await this.sanitizeOutput(entry, ctx)

    return this.transformResponse(sanitizedEntity)
  },

  async update(ctx) {
    const { id } = ctx.params

    const entity = await strapi.db.query('api::post.post').findOne({
      where: { id, users_permissions_user: { id: ctx.state.user.id } }
    });

    if (!entity) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const { data } = ctx.request.body as any

    const parseData = JSON.parse(data)

    const entry = await strapi.entityService.update('api::post.post', id, {
      data: { ...parseData },
    })

    const sanitizedEntity = await this.sanitizeOutput(entry, ctx)

    return this.transformResponse(sanitizedEntity)
  },

  async delete(ctx) {
    const { id } = ctx.params

    const entity = await strapi.db.query('api::post.post').findOne({
      where: { id, users_permissions_user: { id: ctx.state.user.id } }
    });

    if (!entity) {
      return ctx.notFound();
    }

    const response = await super.delete(ctx);

    return response;
  }
}));
