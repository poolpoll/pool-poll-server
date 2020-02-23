const CONFIG = {
  DB: {
    DIALECT: "mysql",
    HOST: "localhost",
    PORT: "3306",
    DATABASE: "free_poll_dev",
    USER: "root",
    PASSWORD: "1"
  },

  ATTACHMENT: {
    DEST: "/Users/jay-dev/uploads"
  },

  COIN_RULE: {
    REGIST_POLL: 20,
    DELETE_BEFORE_EXPIRED: -20,
    DELETE_AFTER_EXPPIRED: -5,
    REGIST_COMMENT: 3,
    JOIN_POLL: 3
  }
};

module.exports = CONFIG;
