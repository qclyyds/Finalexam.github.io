// 模式选择页面 JavaScript

let selectedMode = null;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取选择的科目
    const subject = localStorage.getItem('selectedSubject');
    if (!subject) {
        // 如果没有选择科目，返回首页
        window.location.href = 'index.html';
        return;
    }
    
    // 设置科目标题
    const subjectNames = {
        'nlp': '自然语言处理'
    };
    document.getElementById('subject-title').textContent = subjectNames[subject] || subject;
    
    // 添加动画效果
    animateElements();
});

// 选择模式
function selectMode(mode) {
    selectedMode = mode;
    
    // 移除其他模式的选中状态
    document.querySelectorAll('.mode-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    const selectedCard = document.getElementById(mode + '-mode');
    selectedCard.classList.add('selected');
    
    // 启用开始按钮
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = false;
    startBtn.innerHTML = '<span>开始练习 →</span>';
}

// 开始练习
function startPractice() {
    if (!selectedMode) {
        alert('请先选择练习模式！');
        return;
    }
    
    // 获取参数设置
    const questionCount = document.getElementById('question-count').value;
    const questionOrder = document.getElementById('question-order').value;
    
    // 获取题目类型
    const types = [];
    if (document.getElementById('type-single').checked) types.push('single');
    if (document.getElementById('type-multiple').checked) types.push('multiple');
    if (document.getElementById('type-blank').checked) types.push('blank');
    
    if (types.length === 0) {
        alert('请至少选择一种题目类型！');
        return;
    }
    
    // 保存设置到 localStorage
    const settings = {
        mode: selectedMode,
        count: questionCount,
        order: questionOrder,
        types: types,
        subject: localStorage.getItem('selectedSubject')
    };
    
    localStorage.setItem('practiceSettings', JSON.stringify(settings));
    
    // 跳转到答题页面
    window.location.href = 'practice.html';
}

// 返回首页
function goBack() {
    window.location.href = 'index.html';
}

// 添加动画效果
function animateElements() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 150);
    });
}
