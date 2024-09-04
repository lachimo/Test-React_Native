/**
 * Hàm này dùng để viết hoa chữ cái đầu tiên của chuỗi.
 * @param {string}  - Chuỗi cần được capitalize.
 * @returns {string} - Chuỗi đã được capitalize.
 */
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
