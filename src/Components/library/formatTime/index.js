export function FormatTime(dbTime) {
    // Thời gian lấy ra từ cơ sở dữ liệu (ví dụ)

    // Chuyển đổi chuỗi thời gian từ cơ sở dữ liệu sang đối tượng Date
    const dbDate = new Date(dbTime);

    // Tính khoảng thời gian giữa dbDate và thời điểm hiện tại
    const currentDate = new Date();
    const differenceInSeconds = Math.floor((currentDate - dbDate) / 1000);

    // Chuyển đổi khoảng thời gian sang đơn vị ngày, giờ, phút, giây
    const days = Math.floor(differenceInSeconds / (3600 * 24));
    const hours = Math.floor((differenceInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    const seconds = differenceInSeconds % 60;

    // Xây dựng chuỗi hiển thị khoảng thời gian
    let timeAgo = "";
    if (days > 0) {
        timeAgo = `${days} day(s) ago`;
    } else if (hours > 0) {
        timeAgo = `${hours} hour(s) ago`;
    } else if (minutes > 0) {
        timeAgo = `${minutes} minute(s) ago`;
    } else {
        timeAgo = `${seconds} second(s) ago`;
    }

    return timeAgo // In ra ví dụ: "2 days ago", "3 hours ago", "1 minute ago", ...

}