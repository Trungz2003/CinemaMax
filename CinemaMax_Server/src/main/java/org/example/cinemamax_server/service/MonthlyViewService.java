package org.example.cinemamax_server.service;

import org.example.cinemamax_server.repository.MoviesRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class MonthlyViewService {

    private final MoviesRepository movieRepository;
    private int startOfMonthViews = 0; // Lượt xem tổng đầu tháng

    public MonthlyViewService(MoviesRepository movieRepository) {
        this.movieRepository = movieRepository;
        this.startOfMonthViews = movieRepository.getTotalViews(); // Lấy giá trị ban đầu khi server khởi động
    }

    // Lấy tổng số lượt xem hiện tại
    public int getCurrentTotalViews() {
        return movieRepository.getTotalViews();
    }

    // Tính lượt xem trong tháng
    public int getMonthlyViews() {
        return getCurrentTotalViews() - startOfMonthViews;
    }

    // Tính % tăng trưởng
    public double getMonthlyGrowthPercentage() {
        if (startOfMonthViews == 0) return 100.0; // Tránh chia cho 0
        return ((double) getMonthlyViews() / startOfMonthViews) * 100;
    }

    // Cập nhật tổng lượt xem khi xóa phim
    public void updateTotalViewsAfterDeletion(int movieViewCount) {
        startOfMonthViews -= movieViewCount;  // Trừ đi lượt xem của bộ phim bị xóa
    }

    // Lập lịch mỗi ngày để kiểm tra tổng lượt xem và cập nhật nếu cần
    @Scheduled(cron = "0 0 0 * * ?")  // Chạy vào lúc 00:00 mỗi ngày
    public void checkAndUpdateTotalViews() {
        int currentTotalViews = getCurrentTotalViews();

        // Nếu tổng lượt xem hiện tại nhỏ hơn tổng lượt xem đã lưu trong bộ nhớ, cập nhật lại
        if (currentTotalViews < startOfMonthViews) {
            startOfMonthViews = currentTotalViews;  // Cập nhật lại tổng lượt xem đã lưu
        }
    }

    // Reset vào đầu tháng
    @Scheduled(cron = "0 0 0 1 * ?") // Chạy vào 00:00 ngày 1 hàng tháng
    public void resetMonthlyView() {
        startOfMonthViews = getCurrentTotalViews();
    }
}

