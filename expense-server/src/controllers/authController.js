const userDao = require('../dao/userDao');

const authController = {

  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(400).json({
          message: 'Email and password are required'
        });
      }

      const user = await userDao.findByEmail(email);

      if (!user || user.password !== password) {
        return response.status(401).json({
          message: 'Invalid email or password'
        });
      }
      return response.status(200).json({
        message: 'User authenticated',
        user: user
      });

    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Internal server error'
      });
    }
  },

  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        return response.status(400).json({
          message: 'Name, email and password are required'
        });
      }

      const user = await userDao.create({
        name: name,
        email: email,
        password: password
      });

      return response.status(200).json({
        message: 'User registered',
        user: { id: user._id }
      });

    } catch (error) {
      console.error(error);

      if (error.code === 'USER_EXIST') {
        return response.status(400).json({
          message: 'User with the email already exists'
        });
      }

      return response.status(500).json({
        message: 'Internal server error'
      });
    }
  }

};

module.exports = authController;
