// 结果页面 JavaScript

let results = null;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取答题结果
    const resultsStr = localStorage.getItem('practiceResults');
    if (!resultsStr) {
        window.location.href = 'index.html';
        return;
    }
    
    results = JSON.parse(resultsStr);
    
    // 显示结果
    displayResults();
    
    // 添加动画
    animateScore();
});

// 显示结果
function displayResults() {
    const { questions, answers } = results;
    
    // 计算成绩
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    
    const questionResults = questions.map((question, index) => {
        const userAnswer = answers[index];
        let isCorrect = false;
        let status = 'unanswered';
        
        if (userAnswer === null || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
            unansweredCount++;
            status = 'unanswered';
        } else {
            // 判断答案是否正确
            if (question.type === 'single') {
                isCorrect = userAnswer === question.answer;
            } else if (question.type === 'multiple') {
                const correctAnswer = [...question.answer].sort();
                const userAnswerSorted = [...userAnswer].sort();
                isCorrect = JSON.stringify(correctAnswer) === JSON.stringify(userAnswerSorted);
            } else if (question.type === 'blank') {
                isCorrect = userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
            }
            
            if (isCorrect) {
                correctCount++;
                status = 'correct';
            } else {
                wrongCount++;
                status = 'wrong';
            }
        }
        
        return {
            question,
            userAnswer,
            isCorrect,
            status
        };
    });
    
    // 显示成绩概览
    const totalCount = questions.length;
    const scorePercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    
    document.getElementById('score-value').textContent = scorePercentage + '%';
    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongCount;
    document.getElementById('unanswered-count').textContent = unansweredCount;
    
    // 设置圆形进度
    const scoreCircle = document.getElementById('score-circle');
    const scoreDeg = (scorePercentage / 100) * 360;
    scoreCircle.style.setProperty('--score-deg', scoreDeg + 'deg');
    
    // 显示鼓励语
    const encouragement = document.getElementById('encouragement');
    if (scorePercentage >= 90) {
        encouragement.textContent = '🎉 优秀！继续保持！';
    } else if (scorePercentage >= 80) {
        encouragement.textContent = '👏 很好！再接再厉！';
    } else if (scorePercentage >= 60) {
        encouragement.textContent = '💪 不错！继续努力！';
    } else {
        encouragement.textContent = '📚 加油！多加练习！';
    }
    
    // 更新筛选按钮计数
    document.getElementById('all-count').textContent = totalCount;
    document.getElementById('wrong-filter-count').textContent = wrongCount;
    document.getElementById('correct-filter-count').textContent = correctCount;
    
    // 显示题目列表
    displayQuestions(questionResults);
    
    // 错题重做按钮状态
    const retryBtn = document.getElementById('retry-btn');
    if (wrongCount === 0) {
        retryBtn.disabled = true;
        retryBtn.textContent = '没有错题';
    }
}

// 显示题目列表
function displayQuestions(questionResults) {
    const reviewSection = document.getElementById('questions-review');
    reviewSection.innerHTML = '';
    
    questionResults.forEach((result, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `review-question ${result.status}`;
        questionDiv.dataset.status = result.status;
        
        const typeNames = {
            'single': '单选题',
            'multiple': '多选题',
            'blank': '填空题'
        };
        
        const statusNames = {
            'correct': '✓ 正确',
            'wrong': '✗ 错误',
            'unanswered': '未作答'
        };
        
        let answerDisplay = '';
        
        // 用户答案
        if (result.question.type === 'single') {
            if (result.userAnswer !== null) {
                const label = String.fromCharCode(65 + result.userAnswer);
                answerDisplay = `${label}. ${result.question.options[result.userAnswer]}`;
            } else {
                answerDisplay = '未作答';
            }
        } else if (result.question.type === 'multiple') {
            if (result.userAnswer && result.userAnswer.length > 0) {
                const labels = result.userAnswer.map(idx => {
                    const label = String.fromCharCode(65 + idx);
                    return `${label}. ${result.question.options[idx]}`;
                }).join('; ');
                answerDisplay = labels;
            } else {
                answerDisplay = '未作答';
            }
        } else if (result.question.type === 'blank') {
            answerDisplay = result.userAnswer || '未作答';
        }
        
        // 正确答案
        let correctAnswerDisplay = '';
        if (result.question.type === 'single') {
            const label = String.fromCharCode(65 + result.question.answer);
            correctAnswerDisplay = `${label}. ${result.question.options[result.question.answer]}`;
        } else if (result.question.type === 'multiple') {
            const labels = result.question.answer.map(idx => {
                const label = String.fromCharCode(65 + idx);
                return `${label}. ${result.question.options[idx]}`;
            }).join('; ');
            correctAnswerDisplay = labels;
        } else if (result.question.type === 'blank') {
            correctAnswerDisplay = result.question.answer;
        }
        
        // 为选择题生成带高亮的选项
        let optionsHTML = '';
        if (result.question.type !== 'blank') {
            optionsHTML = `
                <div class="review-options">
                    ${result.question.options.map((opt, idx) => {
                        const label = String.fromCharCode(65 + idx);
                        let optionClass = 'review-option';
                        let optionMark = '';
                        
                        // 判断是否是正确答案
                        let isCorrectAnswer = false;
                        if (result.question.type === 'single') {
                            isCorrectAnswer = idx === result.question.answer;
                        } else if (result.question.type === 'multiple') {
                            isCorrectAnswer = result.question.answer.includes(idx);
                        }
                        
                        // 判断是否是用户选择
                        let isUserChoice = false;
                        if (result.question.type === 'single') {
                            isUserChoice = idx === result.userAnswer;
                        } else if (result.question.type === 'multiple') {
                            isUserChoice = result.userAnswer && result.userAnswer.includes(idx);
                        }
                        
                        // 设置样式和标记
                        if (isCorrectAnswer) {
                            optionClass += ' option-correct';
                            optionMark = '<span class="option-mark correct-mark">✓ 正确答案</span>';
                        }
                        if (isUserChoice && !isCorrectAnswer) {
                            optionClass += ' option-wrong';
                            optionMark = '<span class="option-mark wrong-mark">✗ 你的选择</span>';
                        } else if (isUserChoice && isCorrectAnswer) {
                            optionMark = '<span class="option-mark correct-mark">✓ 你的选择</span>';
                        }
                        
                        return `<div class="${optionClass}">
                            <span class="option-label">${label}.</span>
                            <span class="option-text">${opt}</span>
                            ${optionMark}
                        </div>`;
                    }).join('')}
                </div>
            `;
        }
        
        questionDiv.innerHTML = `
            <div class="review-header">
                <span class="review-question-num">第 ${index + 1} 题 (${typeNames[result.question.type]})</span>
                <span class="review-status ${result.status}">${statusNames[result.status]}</span>
            </div>
            <p class="review-question-text">${result.question.question}</p>
            ${optionsHTML}
            ${result.question.type === 'blank' ? `
                <div class="review-answer-section">
                    <span class="review-answer-label">你的答案：</span>
                    <div class="review-answer-content ${result.status === 'correct' ? 'correct' : result.status === 'wrong' ? 'wrong' : ''}">${answerDisplay}</div>
                </div>
                <div class="review-answer-section">
                    <span class="review-answer-label">正确答案：</span>
                    <div class="review-answer-content correct">${correctAnswerDisplay}</div>
                </div>
            ` : ''}
            ${result.question.explanation ? `
                <div class="review-answer-section">
                    <span class="review-answer-label">解析：</span>
                    <div class="review-answer-content">${result.question.explanation}</div>
                </div>
            ` : ''}
        `;
        
        reviewSection.appendChild(questionDiv);
    });
}

// 筛选题目
function filterQuestions(filter) {
    // 更新筛选按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 显示/隐藏题目
    const questions = document.querySelectorAll('.review-question');
    questions.forEach(q => {
        if (filter === 'all') {
            q.style.display = 'block';
        } else {
            q.style.display = q.dataset.status === filter ? 'block' : 'none';
        }
    });
}

// 错题重做
function retryWrongQuestions() {
    const { questions, answers } = results;
    
    // 筛选错题
    const wrongQuestions = [];
    questions.forEach((question, index) => {
        const userAnswer = answers[index];
        let isCorrect = false;
        
        if (userAnswer !== null && userAnswer !== '') {
            if (question.type === 'single') {
                isCorrect = userAnswer === question.answer;
            } else if (question.type === 'multiple') {
                const correctAnswer = [...question.answer].sort();
                const userAnswerSorted = [...userAnswer].sort();
                isCorrect = JSON.stringify(correctAnswer) === JSON.stringify(userAnswerSorted);
            } else if (question.type === 'blank') {
                isCorrect = userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
            }
            
            if (!isCorrect) {
                wrongQuestions.push(question);
            }
        }
    });
    
    if (wrongQuestions.length === 0) {
        alert('没有错题！');
        return;
    }
    
    // 创建新的练习设置
    const newSettings = {
        ...results.settings,
        isRetry: true,
        retryQuestions: wrongQuestions
    };
    
    localStorage.setItem('practiceSettings', JSON.stringify(newSettings));
    localStorage.setItem('retryQuestions', JSON.stringify(wrongQuestions));
    
    // 跳转到答题页面
    window.location.href = 'practice.html';
}

// 再来一次
function practiceAgain() {
    window.location.href = 'mode-select.html';
}

// 返回首页
function goHome() {
    window.location.href = 'index.html';
}

// 成绩动画
function animateScore() {
    const scoreValue = document.getElementById('score-value');
    const targetScore = parseInt(scoreValue.textContent);
    let currentScore = 0;
    const duration = 1500;
    const steps = 60;
    const increment = targetScore / steps;
    const stepDuration = duration / steps;
    
    const animation = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(animation);
        }
        scoreValue.textContent = Math.round(currentScore) + '%';
    }, stepDuration);
}
