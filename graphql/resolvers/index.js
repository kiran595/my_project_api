const Article = require('../../model/article');
const User = require('../../model/User');

module.exports = {
  articles: async () => {
    try {
      const articlesFetched = await Article.find();
      return articlesFetched.map((article) => {
        return {
          ...article._doc,
          _id: article.id,
          createdAt: new Date(article._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createArticle: async (args) => {
    try {
      const { title, body } = args.article;
      const article = new Article({
        title,
        body,
      });
      const newArticle = await article.save();
      return { ...newArticle._doc, _id: newArticle.id };
    } catch (error) {
      throw error;
    }
  },

  createUser: async (args) => {
    try {
      const { fullname, email, password } = args.user;
      const user = new User({ fullname, email, password });
      const newUser = await user.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  // addUser: async (_, { fullname, email, password }) => {
  //   console.log('inside of mutation >>>>>>>>>>>>>');
  //   const user = new User({ fullname, email, password });
  //   await user.save();
  //   return user;
  // },
  deleteUser: async (_, { id }) => {
    await User.findByIdAndRemove(id);
    return 'User deleted';
  },

  getUsers: () => {
    try {
      User.find();
    } catch (error) {
      throw error;
    }
  },
  getUser: async (_, { id }) => {
    try {
      console.log('inside getUser query<<<<<<<<<<<<', id);
      var result = await User.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
