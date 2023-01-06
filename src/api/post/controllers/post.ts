/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body as any

    const parseData = JSON.parse(data)

    parseData.user = ctx.state.user.id

    ctx.request.body = {
      data: JSON.stringify(parseData)
    }

    const response = await super.create(ctx);

    return response;

    // 自己寫的流程
    /*
    const { data } = ctx.request.body as any

    const parseData = JSON.parse(data)

    const entry = await strapi.entityService.create('api::post.post', {
      data: { ...parseData, user: { id: ctx.state.user.id } },
    })

    const sanitizedEntity = await this.sanitizeOutput(entry, ctx)

    return this.transformResponse(sanitizedEntity)
    */
  },

  async update(ctx) {
    // 自己寫的流程

    /*
    const { id } = ctx.params

    const entity = await strapi.db.query('api::post.post').findOne({
      where: { id, user: { id: ctx.state.user.id } }
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
    */
  },

  // 自己寫的流程
  /*
  async delete(ctx) {
    const { id } = ctx.params

    const entity = await strapi.db.query('api::post.post').findOne({
      where: { id, user: { id: ctx.state.user.id } }
    });

    if (!entity) {
      return ctx.notFound();
    }

    const response = await super.delete(ctx);

    return response;
  }
  */
}));
