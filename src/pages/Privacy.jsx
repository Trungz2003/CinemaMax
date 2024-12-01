import React from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageTitle from "../components/PageTitle";

const RenderPrivacy = () => {
  return (
    <div className="bg-[#1a191f] text-[#C0C0C0] w-full border-b border-gray-600 box-border text-[16px]">
      <PageTitle title="Chính sách bảo mật" />
      <div className="w-full py-[70px] md:px-[8%] px-[4%] text-left">
        <h2 className="text-lg font-bold mb-4">1. Giới thiệu</h2>
        <p>
          Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng khi truy
          cập và sử dụng dịch vụ của website. Chính sách này giải thích cách
          chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn nhằm
          đảm bảo sự an tâm khi trải nghiệm sản phẩm.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-4">
          2. Thông tin chúng tôi thu thập
        </h2>
        <p>
          Khi sử dụng dịch vụ của chúng tôi, bạn có thể cần cung cấp thông tin
          cá nhân, bao gồm nhưng không giới hạn:
        </p>
        <ul className="list-disc ml-6">
          <li>Họ tên, email, số điện thoại, địa chỉ thanh toán.</li>
          <li>Thông tin đăng nhập: tài khoản, mật khẩu.</li>
          <li>
            Thông tin thiết bị: địa chỉ IP, loại trình duyệt, hệ điều hành.
          </li>
          <li>Lịch sử hoạt động: phim đã xem, đánh giá, thời gian truy cập.</li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-4">
          3. Mục đích sử dụng thông tin
        </h2>
        <p>Chúng tôi sử dụng thông tin cá nhân của bạn để:</p>
        <ul className="list-disc ml-6">
          <li>
            Quản lý tài khoản, xác thực danh tính, và cung cấp dịch vụ cá nhân
            hóa.
          </li>
          <li>
            Gửi thông báo, ưu đãi, hoặc các thông tin liên quan đến dịch vụ.
          </li>
          <li>
            Phân tích dữ liệu để nâng cao trải nghiệm người dùng và cải thiện
            sản phẩm.
          </li>
          <li>
            Bảo vệ tài khoản khỏi truy cập trái phép hoặc hành vi gian lận.
          </li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-4">4. Chia sẻ thông tin</h2>
        <p>
          Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn
          với bên thứ ba trừ các trường hợp:
        </p>
        <ul className="list-disc ml-6">
          <li>Đáp ứng yêu cầu pháp lý hoặc thực thi pháp luật.</li>
          <li>
            Cung cấp thông tin cho đối tác nhằm thực hiện dịch vụ (ví dụ: thanh
            toán).
          </li>
          <li>Với sự đồng ý của bạn trong các trường hợp cụ thể.</li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-4">
          5. Lưu trữ và bảo vệ thông tin
        </h2>
        <p>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ thông
          tin cá nhân của bạn, bao gồm:
        </p>
        <ul className="list-disc ml-6">
          <li>Mã hóa dữ liệu khi truyền và lưu trữ.</li>
          <li>
            Hạn chế truy cập vào thông tin chỉ dành cho nhân sự được ủy quyền.
          </li>
          <li>Kiểm tra, cập nhật hệ thống bảo mật định kỳ.</li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-4">6. Quyền của người dùng</h2>
        <p>Bạn có quyền:</p>
        <ul className="list-disc ml-6">
          <li>
            Kiểm tra và cập nhật thông tin cá nhân trong tài khoản của mình.
          </li>
          <li>Yêu cầu xóa dữ liệu hoặc hủy tài khoản.</li>
          <li>
            Không nhận thông tin tiếp thị qua email bằng cách hủy đăng ký.
          </li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-4">
          7. Cookie và công nghệ theo dõi
        </h2>
        <p>
          Chúng tôi sử dụng cookie để cá nhân hóa nội dung và lưu trữ tùy chọn
          của bạn. Bạn có thể tùy chỉnh cài đặt cookie thông qua trình duyệt.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-4">
          8. Thay đổi chính sách bảo mật
        </h2>
        <p>
          Chính sách bảo mật này có thể được cập nhật để phù hợp với thay đổi
          pháp luật hoặc nâng cấp dịch vụ. Mọi thay đổi sẽ được thông báo qua
          email hoặc trên website.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-4">9. Liên hệ</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, vui lòng liên hệ với chúng
          tôi qua email:{" "}
          <a href="mailto:support@example.com" className="text-blue-400">
            support@example.com
          </a>{" "}
          hoặc hotline:{" "}
          <a href="tel:1900123456" className="text-blue-400">
            1900-123-456
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const Privacy = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[80px]">
        <Navbar />
      </div>
      <div className="w-full mt-[80px]">
        <RenderPrivacy />
      </div>
      <div className="w-full md:h-[85px] h-[300px]">
        <Footer />
      </div>
    </div>
  );
};

export default Privacy;
