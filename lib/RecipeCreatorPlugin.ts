export const RecipeCreatorPlugin = {
  __type: 'content-creator',
  name: 'New Recipe',
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      validation(title) {
        if (!title) return 'Required';
      },
    },
    {
      label: 'Instructions',
      name: 'markdownBody',
      component: 'markdown',
      description: 'Recipe Instructions',
    },
  ],
  async onSubmit(values, cms) {
    // Call functions that create the new blog post. For example:
    // cms.apis.someBackend.createPost(values);
    console.log({ values });
    console.log(cms.apis);
  },
};
