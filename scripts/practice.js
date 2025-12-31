// 答题页面 JavaScript

let practiceSettings = null;
let allQuestions = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取练习设置
    const settingsStr = localStorage.getItem('practiceSettings');
    if (!settingsStr) {
        window.location.href = 'index.html';
        return;
    }
    
    practiceSettings = JSON.parse(settingsStr);
    
    // 设置页面标题
    const subjectNames = {
        'nlp': '自然语言处理'
    };
    document.getElementById('subject-name').textContent = subjectNames[practiceSettings.subject] || practiceSettings.subject;
    
    // 设置模式标签
    const modeBadge = document.getElementById('mode-badge');
    modeBadge.textContent = practiceSettings.mode === 'review' ? '复习模式' : '考试模式';
    
    // 加载题库
    loadQuestions();
});

// 加载题库
async function loadQuestions() {
    try {
        // 检查是否是错题重做模式
        if (practiceSettings.isRetry) {
            const retryQuestions = localStorage.getItem('retryQuestions');
            if (retryQuestions) {
                allQuestions = JSON.parse(retryQuestions);
                filterQuestions();
                initPractice();
                return;
            }
        }
        
        // 从JavaScript题库加载题目（避免CORS问题）
        // 合并三个题库：单选题、多选题、填空题
        if (typeof singleChoiceQuestions !== 'undefined' && 
            typeof multipleChoiceQuestions !== 'undefined' && 
            typeof blankQuestions !== 'undefined') {
            
            allQuestions = [
                ...singleChoiceQuestions,
                ...multipleChoiceQuestions,
                ...blankQuestions
            ];
        } else if (typeof questionBank !== 'undefined' && questionBank[practiceSettings.subject]) {
            // 兼容旧版本的题库格式
            allQuestions = questionBank[practiceSettings.subject];
        } else {
            // 如果题库未定义，尝试从JSON文件加载（需要本地服务器）
            const response = await fetch(`data/${practiceSettings.subject}.json`);
            if (!response.ok) {
                throw new Error('题库加载失败');
            }
            allQuestions = await response.json();
        }
        
        // 筛选题目
        filterQuestions();
        
        // 初始化答题
        initPractice();
    } catch (error) {
        console.error('加载题库失败:', error);
        alert('题库加载失败！请确保已正确引入题库文件（scripts/questions-*.js）');
        window.location.href = 'index.html';
    }
}

// 筛选题目
function filterQuestions() {
    // 如果是错题重做，直接使用所有题目
    if (practiceSettings.isRetry) {
        currentQuestions = allQuestions;
        userAnswers = new Array(currentQuestions.length).fill(null);
        return;
    }
    
    // 根据题目类型筛选
    let filtered = allQuestions.filter(q => practiceSettings.types.includes(q.type));
    
    // 随机排序或按序
    if (practiceSettings.order === 'random') {
        filtered = shuffleArray(filtered);
    }
    
    // 限制数量
    if (practiceSettings.count !== 'all') {
        const count = parseInt(practiceSettings.count);
        filtered = filtered.slice(0, Math.min(count, filtered.length));
    }
    
    currentQuestions = filtered;
    
    // 初始化用户答案数组
    userAnswers = new Array(currentQuestions.length).fill(null);
}

// 数组随机排序
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 初始化练习
function initPractice() {
    // 创建题目导航
    createQuestionNav();
    
    // 显示第一题
    showQuestion(0);
}

// 创建题目导航
function createQuestionNav() {
    const nav = document.getElementById('question-nav');
    nav.innerHTML = '';
    
    currentQuestions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = index + 1;
        btn.onclick = () => jumpToQuestion(index);
        nav.appendChild(btn);
    });
    
    // 更新进度文本
    updateProgress();
}

// 显示题目
function showQuestion(index) {
    currentQuestionIndex = index;
    const question = currentQuestions[index];
    
    // 更新题目类型
    const typeNames = {
        'single': '单选题',
        'multiple': '多选题',
        'blank': '填空题'
    };
    document.getElementById('question-type').textContent = typeNames[question.type];
    
    // 更新题号
    document.getElementById('question-number').textContent = `第 ${index + 1} 题`;
    
    // 更新题目内容
    document.getElementById('question-text').textContent = question.question;
    
    // 渲染答案区域
    renderAnswerSection(question);
    
    // 更新按钮状态
    updateButtons();
    
    // 更新进度
    updateProgress();
    
    // 更新导航状态
    updateNavigation();
    
    // 如果是复习模式且已作答，显示反馈
    if (practiceSettings.mode === 'review' && userAnswers[index] !== null) {
        showFeedback(index);
    } else {
        hideFeedback();
    }
}

// 渲染答案区域
function renderAnswerSection(question) {
    const answerSection = document.getElementById('answer-section');
    answerSection.innerHTML = '';
    
    if (question.type === 'single' || question.type === 'multiple') {
        // 单选题或多选题
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-item';
            optionDiv.onclick = () => selectOption(index);
            
            const label = String.fromCharCode(65 + index); // A, B, C, D...
            
            optionDiv.innerHTML = `
                <span class="option-label">${label}</span>
                <span class="option-text">${option}</span>
                <span class="option-icon"></span>
            `;
            
            answerSection.appendChild(optionDiv);
        });
        
        // 恢复用户已选答案
        const userAnswer = userAnswers[currentQuestionIndex];
        if (userAnswer !== null) {
            if (question.type === 'single') {
                const options = answerSection.querySelectorAll('.option-item');
                options[userAnswer].classList.add('selected');
            } else {
                const options = answerSection.querySelectorAll('.option-item');
                userAnswer.forEach(idx => {
                    options[idx].classList.add('selected');
                });
            }
        }
    } else if (question.type === 'blank') {
        // 填空题
        const input = document.createElement('textarea');
        input.className = 'blank-input';
        input.placeholder = '请输入答案...';
        input.rows = 3;
        input.value = userAnswers[currentQuestionIndex] || '';
        input.oninput = (e) => {
            userAnswers[currentQuestionIndex] = e.target.value.trim();
            updateNavigation();
        };
        
        answerSection.appendChild(input);
    }
}

// 选择选项
function selectOption(optionIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-item');
    
    // 如果是复习模式且已经显示反馈，不允许修改答案
    if (practiceSettings.mode === 'review' && userAnswers[currentQuestionIndex] !== null) {
        return;
    }
    
    if (question.type === 'single') {
        // 单选题：清除其他选项
        options.forEach(opt => opt.classList.remove('selected'));
        options[optionIndex].classList.add('selected');
        userAnswers[currentQuestionIndex] = optionIndex;
        
        // 复习模式：立即显示反馈
        if (practiceSettings.mode === 'review') {
            showFeedback(currentQuestionIndex);
        }
    } else if (question.type === 'multiple') {
        // 多选题：切换选中状态
        options[optionIndex].classList.toggle('selected');
        
        // 更新用户答案
        const selectedIndexes = Array.from(options)
            .map((opt, idx) => opt.classList.contains('selected') ? idx : -1)
            .filter(idx => idx !== -1);
        
        userAnswers[currentQuestionIndex] = selectedIndexes.length > 0 ? selectedIndexes : null;
        
        // 复习模式：选择完成后显示反馈（需要用户确认）
        // 这里可以添加一个"确认"按钮，或者在选择后自动显示
    }
    
    // 更新导航
    updateNavigation();
}

// 显示反馈（复习模式）
function showFeedback(questionIndex) {
    const question = currentQuestions[questionIndex];
    const userAnswer = userAnswers[questionIndex];
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackAnswer = document.getElementById('feedback-answer');
    
    let isCorrect = false;
    
    // 判断答案是否正确
    if (question.type === 'single') {
        isCorrect = userAnswer === question.answer;
    } else if (question.type === 'multiple') {
        const correctAnswer = question.answer.sort();
        const userAnswerSorted = userAnswer ? [...userAnswer].sort() : [];
        isCorrect = JSON.stringify(correctAnswer) === JSON.stringify(userAnswerSorted);
    } else if (question.type === 'blank') {
        // 填空题：简单字符串比较（可以改进为更复杂的匹配）
        isCorrect = userAnswer && userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
    }
    
    // 设置反馈样式和内容
    feedbackSection.style.display = 'block';
    feedbackSection.className = 'feedback-section ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackTitle.textContent = isCorrect ? '回答正确！' : '回答错误';
    
    // 显示正确答案
    let answerText = '';
    if (question.type === 'single') {
        const label = String.fromCharCode(65 + question.answer);
        answerText = `正确答案：${label}. ${question.options[question.answer]}`;
    } else if (question.type === 'multiple') {
        const labels = question.answer.map(idx => String.fromCharCode(65 + idx)).join(', ');
        answerText = `正确答案：${labels}`;
    } else if (question.type === 'blank') {
        answerText = `正确答案：${question.answer}`;
    }
    
    if (question.explanation) {
        answerText += `\n\n解析：${question.explanation}`;
    }
    
    feedbackAnswer.textContent = answerText;
    
    // 标记选项的正确与错误
    if (question.type === 'single' || question.type === 'multiple') {
        const options = document.querySelectorAll('.option-item');
        options.forEach((opt, idx) => {
            opt.classList.add('disabled');
            
            if (question.type === 'single') {
                if (idx === question.answer) {
                    opt.classList.add('correct');
                    opt.querySelector('.option-icon').textContent = '✓';
                } else if (idx === userAnswer) {
                    opt.classList.add('wrong');
                    opt.querySelector('.option-icon').textContent = '✗';
                }
            } else {
                if (question.answer.includes(idx)) {
                    opt.classList.add('correct');
                    opt.querySelector('.option-icon').textContent = '✓';
                } else if (userAnswer && userAnswer.includes(idx)) {
                    opt.classList.add('wrong');
                    opt.querySelector('.option-icon').textContent = '✗';
                }
            }
        });
    } else if (question.type === 'blank') {
        const input = document.querySelector('.blank-input');
        input.disabled = true;
        input.classList.add(isCorrect ? 'correct' : 'wrong');
    }
}

// 隐藏反馈
function hideFeedback() {
    const feedbackSection = document.getElementById('feedback-section');
    feedbackSection.style.display = 'none';
}

// 上一题
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// 下一题
function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

// 跳转到指定题目
function jumpToQuestion(index) {
    showQuestion(index);
}

// 更新按钮状态
function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // 上一题按钮
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // 下一题/提交按钮
    if (currentQuestionIndex === currentQuestions.length - 1) {
        // 最后一题
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        
        // 修改按钮文字
        if (practiceSettings.mode === 'review') {
            submitBtn.textContent = '查看结果';
        } else {
            submitBtn.textContent = '提交答案';
        }
    } else {
        nextBtn.style.display = 'inline-flex';
        nextBtn.disabled = false;
        submitBtn.style.display = 'none';
    }
}

// 更新进度
function updateProgress() {
    const progressText = document.getElementById('progress-text');
    progressText.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
    
    const progressFill = document.getElementById('progress-fill');
    const percentage = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressFill.style.width = percentage + '%';
}

// 更新导航状态
function updateNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach((btn, index) => {
        btn.classList.remove('active', 'answered', 'correct', 'wrong');
        
        if (index === currentQuestionIndex) {
            btn.classList.add('active');
        } else if (userAnswers[index] !== null) {
            btn.classList.add('answered');
        }
    });
}

// 提交所有答案
function submitAllAnswers() {
    // 检查是否所有题目都已作答
    const unansweredCount = userAnswers.filter(a => a === null || a === '').length;
    
    if (unansweredCount > 0) {
        const confirmed = confirm(`还有 ${unansweredCount} 题未作答，确认提交吗？`);
        if (!confirmed) {
            return;
        }
    }
    
    // 保存答题结果
    const results = {
        settings: practiceSettings,
        questions: currentQuestions,
        answers: userAnswers,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('practiceResults', JSON.stringify(results));
    
    // 跳转到结果页面
    window.location.href = 'result.html';
}

// 确认退出
function confirmExit() {
    const modal = document.getElementById('exit-modal');
    modal.style.display = 'flex';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('exit-modal');
    modal.style.display = 'none';
}

// 退出练习
function exitPractice() {
    window.location.href = 'mode-select.html';
}
