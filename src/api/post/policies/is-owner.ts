export default async (policyContext, config, { strapi }) => {
  const { id } = policyContext.params

  const entity = await strapi.db.query('api::post.post').findOne({
    where: { id, user: { id: policyContext.state.user.id } }
  });

  if (!entity) {
    return false
  }

  return true;
};
