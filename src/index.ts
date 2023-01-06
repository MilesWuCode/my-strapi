export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use({
      resolversConfig: {
        'Mutation.updatePost': {
          policies: [
            async (context) => {
              const id = context.args.id

              const entity = await strapi.db.query('api::post.post').findOne({
                where: { id, user: { id: context.state.user.id } }
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
