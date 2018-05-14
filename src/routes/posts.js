module.exports = () => ({
  getPost: {
    path: '/posts/:id',
    methods: ['GET'],
    callback: (req, { connection, someData, config, serializer }) => {
      require('all-log').default({
        req, connection, someData, config, serializer,
      });
      return serializer.serialize({
        title: 'Some title',
        content: 'Some content goes here',
        tags: [
          'one',
          'two',
          'three',
          4,
        ],
      }, [], 'Post');
    },
    middleware: [],
  },
});
