// 首页 JavaScript

// 选择科目
function selectSubject(subject) {
    // 保存选择的科目到 localStorage
    localStorage.setItem('selectedSubject', subject);
    
    // 跳转到模式选择页面
    window.location.href = 'mode-select.html';
}

// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});
