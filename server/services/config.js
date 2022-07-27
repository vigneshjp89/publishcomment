const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "zxcv1234!",
      database: "publishcomment",
      port:3306
    },
    listPerPage: 100,
  };
  module.exports = config;