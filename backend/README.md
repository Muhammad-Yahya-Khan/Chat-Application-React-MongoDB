# Backend

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file or use the existing one with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

## Running the Server

Development mode (with nodemon):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Enable CORS
- dotenv - Environment variables
- socket.io - Real-time communication
