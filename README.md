--sau khi clone chạy lệnh npm install trong terminal

--cần cài docker trước
--docker compose down -v
--docker compose up -d
--Chạy 2 lệnh trên để tạo database petshop.sql
--npm run dev để chạy server

--tạo file .env lưu các thông số bên dưới
PORT=8084 --nếu lỗi có thể dổi port
HOST_NAME=localhost
NODE_ENV=development

--thông số kết nối database trên docker
DB_HOST=localhost
DB_PORT=3334
DB_USER=root
DB_PASSWORD=123456
DB_NAME=petshop

--thông số key token có thể đổi nếu muốn
ACCESS_SECRET=123456@
REFRESH_SECRET=123456789
