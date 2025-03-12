## 📂 Project Structure Back-end

```
📦 project-name
 ┣ 📂 src
 ┃ ┣ 📂 apis
 ┃ ┣ ┣ 📂 v1
 ┃ ┣ ┣ ┣ 📂 controllers
 ┃ ┣ ┣ ┣ 📂 middlewares
 ┃ ┣ ┣ ┣ 📂 models
 ┃ ┣ ┣ ┣ 📂 repository
 ┃ ┣ ┣ ┣ 📂 routes
 ┃ ┣ ┣ ┣ 📂 services
 ┃ ┣ ┣ ┣ 📂 utils
 ┃ ┣ ┣ ┣ 📂 validation
 ┃ ┣ 📂 config
 ┃ ┣ 📂 test
 ┃ ┗ 📜 app.js
 ┃ ┗ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

### 1️⃣ **Yêu cầu**

- Node.js >= 16
- Database
- Other necessary dependencies

### 2️⃣ **Clone the repository**

```sh
git clone https://github.com/phucngdev/TM-BE.git
cd repository
```

### 3️⃣ **Install dependencies**

```sh
npm install
```

### 4️⃣ **Setup environment variables**

Create a `.env` file and configure:

```
MONGODB_URL=yoururldatabase
JWT_ACC_SECRET=yourkey
JWT_REF_SECRET=yourkey
VITE_SECRET_KEY=yourkey
```

### 5️⃣ **Chạy dự án**

```sh
npm start
```

## 📩 Contact

- 📧 Email: phucnguyen09022003@gmail.com
- 📌 Portfolio: [nguyenminhphuc.vercel.app](https://nguyenminhphuc.vercel.app)
- 🔗 Github: [github.com/phucngdev](https://github.com/phucngdev)
