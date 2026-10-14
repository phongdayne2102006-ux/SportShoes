# SportShoes

Website giới thiệu và đặt thử giày thể thao bằng HTML, CSS và JavaScript thuần. Không cần cài Node.js, npm, cơ sở dữ liệu hoặc extension.

## Chạy website

Mở trực tiếp `public\index.html` bằng trình duyệt (nhấp đúp file hoặc kéo file vào cửa sổ Chrome/Edge).

Website cũng có thể được đưa lên bất kỳ dịch vụ lưu trữ website tĩnh nào. Không cần lệnh build.

## Chức năng trong bản tĩnh

- Tìm kiếm, lọc danh mục và xem chi tiết sản phẩm mẫu.
- Giỏ hàng, tồn kho và đơn đặt thử được lưu trong local storage của trình duyệt.
- Giao diện tương thích điện thoại và máy tính.

Đơn đặt thử chỉ được lưu trên thiết bị/trình duyệt hiện tại; không được gửi đến cửa hàng hay máy chủ. Dữ liệu có thể bị xóa khi người dùng xóa dữ liệu trình duyệt.

## Thay đổi sản phẩm

Chỉnh danh sách `products` ở đầu file `public\js\products.js`. Ảnh hiện sử dụng URL bên ngoài, nên cần kết nối Internet để tải ảnh và font chữ.
