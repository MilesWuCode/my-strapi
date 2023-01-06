export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.shadowCRUD('api::post.post')
      .field('user')
      .disableInput()

    extensionService.use({
      resolversConfig: {
        'Mutation.createPost': {
          middlewares: [
            (resolve, parent, args, context, info) => {
              args.data.user = context.state.user.id

              return resolve(parent, args, context, info);
            }
          ],
          auth: true
        },
        'Mutation.updatePost': {
          policies: [
            async (context) => {
              const entity = await strapi.db.query('api::post.post').findOne({
                where: { id: context.args.id, user: { id: context.state.user.id } }
              });

              if (!entity) {
                return false
              }

              return true
            }
          ],
          auth: true
        },
        'Mutation.updateDelete': {
          policies: [
            async (context) => {
              const entity = await strapi.db.query('api::post.post').findOne({
                where: { id: context.args.id, user: { id: context.state.user.id } }
              });

              if (!entity) {
                return false
              }

              return true
            }
          ],
          auth: true
        }
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};
