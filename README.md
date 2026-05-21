# Backend Test - CRUD Materials
Projek backend API dengan fungsi melakukan create, read, update, dan delet pada data material. 

## Berikut Fiturnya:
- CRUD Materials
- Seeder dengan Faker
- Caching menggunakan Redis
- Queue dengan BullMQ
- Menggunakan ORM Seqeuelize
- Proses Asynchronus dalam email
---  

## Tech Stack: 
- Node.js
- Express.js
- MySQL
- Sequelize
- Redis (Ioredis)
- BullMQ
- Faker.js
---

## Tutorial Setup Projek
1. Clone Repository 
   ```bash
   git clone https://github.com/daff11/bp-test
   cd bp-test
   ```
   Atau download filenya

2. Instal Depedency
   ```bash
   npm install
   ```

3. Impor file bp_test.sql ke local database MySQL

5. Jalankan Redis menggunakan docker
   ```bash
   docker run -d --name redis-container -p 6379:6379 redis
   ```
   Bisa cek status running dengan
   ```bash
   docker ps
   ```

6. Jalankan aplikasi
   ```bash
   npm run dev
   ```
   Jika berhasil akan muncul log seperti di bawah:
   ```bash
   DB Terhubung
   Table synced
   Server running on port 3000
   ```

## API Endpoints
- Create Material
  ```http
  POST http://localhost:3000/materials
  ```
  Contoh Body
  ```json
  {
    "title": "title",
    "content": "content"
  }
  ```

- Get All Materials
  ```http
  GET http://localhost:3000/materials
  ```

- Get By Id Material
  ```http
  GET http://localhost:3000/materials/:id
  ```
  Endpoint ini menggunakan Redis serta BullMQ
  Ganti Atribut :id sesuai dengan id yang diinginkan 

- Update Material
  ```http
  PUT http://localhost:3000/materials/:id
  ```
  Contoh Body
  ```json
  {
    "title": "updated title",
    "content": "updated content"
  }
  ```

- Delete Material
  ```http
  DELETE http://localhost:3000/materials/:id
  ```

- Seeder dengan Faker
  Menambahkan 50 data dummy
  ```http
  POST http://localhost:3000/materials/seed/faker
  ```
---

## Flow Redis pada Endpoint Get By Id
1. Cek cache pada Redis
2. Jika terdapat cache, maka langsung return data yang disimpan pada cache tersebut
3. Jika tidak terdapat cache, maka mengambil data dari query database
4. Setelah itu, save data ke dalam Redis
---

### Catatan: tidak perlu membuat tabel secara manual karena dalam projek ini sudah dilengkapi fitur 
```javascript
sequelize.sync()
``` 
yang dapat otomatis membuat tabel sesuai model databasenya
