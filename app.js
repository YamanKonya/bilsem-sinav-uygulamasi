// Disable Back Button
history.pushState(null, null, location.href);
window.addEventListener('popstate', function () {
    history.pushState(null, null, location.href);
});

// App State
const state = {
    currentIndex: 0,
    questions: [],
    questionTimer: null,
    optionTimer: null,
    intervalTimer: null,
    autoAdvanceMs: 15000, // 15 seconds
    results: {},
    optionsDelayMs: 3000,  // 3 seconds
    timeLeft: 30
};

// Template: Image-Grid (Universal visual question)
function createImageGridQuestion({ instructionHTML, mainContentHTML, optionsHTML, delayMs = 0, timerSeconds = 15, theme = '' }) {
    return {
        type: 'image-grid',
        theme: theme,
        timerSeconds: timerSeconds,
        renderQuestion: () => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            wrapper.style.width = '100%';
            wrapper.style.gap = '20px';

            if (instructionHTML) {
                const bubble = document.createElement('div');
                bubble.className = 'speech-bubble';
                bubble.innerHTML = instructionHTML;
                wrapper.appendChild(bubble);
            }

            const container = document.createElement('div');
            container.className = 'main-content-box';
            container.innerHTML = mainContentHTML;
            wrapper.appendChild(container);
            
            return wrapper;
        },
        optionsDelayOverride: delayMs,
        options: optionsHTML.map((html, idx) => ({
            id: `opt${idx + 1}`,
            render: () => html
        }))
    };
}

// Template: Memory-Timer (Visual options, multiple items support)
function createMemoryTimerQuestion({ instructionHTML, itemsHTML, hiddenIndex = 0, displayMs = 5000, optionsHTML, theme = '' }) {
    return {
        type: 'memory-timer',
        theme: theme,
        timerSeconds: 15,
        renderQuestion: (container) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            wrapper.style.width = '100%';
            wrapper.style.gap = '20px';

            if (instructionHTML) {
                const bubble = document.createElement('div');
                bubble.className = 'speech-bubble';
                bubble.innerHTML = instructionHTML;
                wrapper.appendChild(bubble);
            }

            const mainBox = document.createElement('div');
            mainBox.className = 'main-content-box';
            mainBox.style.display = 'flex';
            mainBox.style.gap = '30px';
            
            const itemDivs = itemsHTML.map(html => {
                const div = document.createElement('div');
                div.className = 'memory-content';
                div.innerHTML = html;
                mainBox.appendChild(div);
                return div;
            });

            wrapper.appendChild(mainBox);
            
            // Hide specific content and show '?' after displayMs
            setTimeout(() => {
                if (itemDivs[hiddenIndex]) {
                    itemDivs[hiddenIndex].innerHTML = '<div style="font-size: 100px; font-weight: bold; color: #2f3640;">?</div>';
                }
                // Reveal options
                elements.optionsContainer.style.opacity = '1';
                elements.optionsContainer.style.pointerEvents = 'auto';
            }, displayMs);

            return wrapper;
        },
        optionsDelayOverride: 9999999, // Handled manually
        options: optionsHTML.map((html, idx) => ({
            id: `opt${idx + 1}`,
            render: () => html
        }))
    };
}

function buildMenu() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('completion-screen').classList.add('hidden');
    
    const grid = document.getElementById('category-menu-grid');
    grid.innerHTML = '';
    
    const allCategories = Object.keys(window.QuestionDatabase || {});
    allCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn category-btn';
        btn.innerText = cat + ' Çalış';
        btn.onclick = () => startPractice(cat);
        grid.appendChild(btn);
    });
}

function startExam() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('completion-screen').classList.add('hidden');
    generateSession('exam');
    loadQuestion(0);
}

function startPractice(categoryId) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('completion-screen').classList.add('hidden');
    generateSession('practice', categoryId);
    loadQuestion(0);
}

function generateSession(mode, categoryId) {
    state.results = {};
    state.questions = [];
    
    if (mode === 'exam') {
        const allCategories = Object.keys(window.QuestionDatabase || {});
        const selectedByCategory = {};
        allCategories.forEach(cat => {
            state.results[cat] = { correct: 0, total: 5 };
            const shuffled = [...window.QuestionDatabase[cat]].sort(() => 0.5 - Math.random());
            selectedByCategory[cat] = shuffled.slice(0, 5);
        });

        for(let i=0; i<5; i++) {
            const catsRound = [...allCategories].sort(() => 0.5 - Math.random());
            catsRound.forEach(cat => {
                const qData = selectedByCategory[cat][i];
                if(!qData) return;
                addQuestionToState(qData);
            });
        }
    } else if (mode === 'practice') {
        state.results[categoryId] = { correct: 0, total: 10 };
        const shuffled = [...window.QuestionDatabase[categoryId]].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        selected.forEach(qData => addQuestionToState(qData));
    }
}

function addQuestionToState(qData) {
    let qObj;
    if (qData.template === 'memory-timer') {
        qObj = createMemoryTimerQuestion(qData);
    } else {
        qObj = createImageGridQuestion(qData);
    }
    qObj.correctOptionIndex = qData.correctOptionIndex;
    qObj.categoryId = qData.categoryId;
    qObj.timerSeconds = 15;
    state.questions.push(qObj);
}

const elements = {
    questionContainer: document.getElementById('question-container'),
    optionsContainer: document.getElementById('options-container'),
    appContainer: document.getElementById('app-container'),
    completionScreen: document.getElementById('completion-screen'),
    circularTimer: null // Will create dynamically
};

function initEngine() {
    buildMenu();
}

function loadQuestion(index) {
    if (index >= state.questions.length) {
        finishExam();
        return;
    }

    state.currentIndex = index;
    const q = state.questions[index];

    // Apply Theme
    document.body.className = q.theme || '';

    // Create circular timer if not exists
    if (!elements.circularTimer) {
        elements.circularTimer = document.createElement('div');
        elements.circularTimer.className = 'circular-timer';
        elements.appContainer.appendChild(elements.circularTimer);
    }

    // Reset UI
    elements.optionsContainer.innerHTML = '';
    elements.optionsContainer.style.opacity = '0';
    elements.optionsContainer.style.pointerEvents = 'none';
    elements.questionContainer.innerHTML = '';

    // Render Question
    const qEl = q.renderQuestion(elements.questionContainer);
    elements.questionContainer.appendChild(qEl);

    // Render Options
    if (q.options.length === 0) {
        elements.optionsContainer.style.display = 'none';
    } else {
        elements.optionsContainer.style.display = 'flex';
        q.options.forEach((opt, optIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = opt.render();
            // Handle selection (no feedback, instant advance)
            btn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                handleSelection(optIndex);
            });
            elements.optionsContainer.appendChild(btn);
        });
    }

    startTimers(q);
}

function startTimers(q) {
    clearTimers();

    const delay = q.optionsDelayOverride !== undefined ? q.optionsDelayOverride : state.optionsDelayMs;
    const totalTime = (q.timerSeconds * 1000) || state.autoAdvanceMs;
    state.timeLeft = Math.floor(totalTime / 1000);
    
    elements.circularTimer.innerText = state.timeLeft;

    // Timer to reveal options
    if (q.type !== 'memory-timer') {
        state.optionTimer = setTimeout(() => {
            elements.optionsContainer.style.opacity = '1';
            elements.optionsContainer.style.pointerEvents = 'auto';
        }, delay);
    }

    // Countdown interval
    state.intervalTimer = setInterval(() => {
        state.timeLeft--;
        elements.circularTimer.innerText = state.timeLeft;
        if (state.timeLeft <= 0) {
            handleSelection();
        }
    }, 1000);
}

function clearTimers() {
    if (state.optionTimer) clearTimeout(state.optionTimer);
    if (state.intervalTimer) clearInterval(state.intervalTimer);
}

function handleSelection(optIndex) {
    clearTimers();
    
    const q = state.questions[state.currentIndex];
    
    // Check answer
    if (optIndex !== undefined && optIndex === q.correctOptionIndex) {
        state.results[q.categoryId].correct++;
    }

    loadQuestion(state.currentIndex + 1);
}

function finishExam() {
    elements.appContainer.classList.add('hidden');
    elements.completionScreen.classList.remove('hidden');
    
    const content = elements.completionScreen.querySelector('.completion-content');
    
    let resultsHtml = '<h2 style="font-size:40px; color:#2f3640; margin-bottom: 20px;">Tamamlandı!</h2><div class="results-grid" style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center; max-width: 900px;">';
    
    for(let cat in state.results) {
        const r = state.results[cat];
        const pct = Math.round((r.correct / r.total) * 100);
        
        let color = '#e74c3c';
        if(pct >= 80) color = '#2ecc71';
        else if(pct >= 50) color = '#f39c12';
        
        resultsHtml += `
            <div style="background:#f1f2f6; border:3px solid ${color}; border-radius:15px; padding:20px; min-width:200px;">
                <h3 style="margin:0 0 10px 0; font-size:24px; color:#2f3640;">${cat}</h3>
                <div style="font-size:40px; font-weight:bold; color:${color};">%${pct}</div>
                <div style="font-size:18px; color:#7f8c8d; margin-top:5px; margin-bottom: 15px;">${r.correct} / ${r.total} Doğru</div>
                ${pct < 100 ? `<button onclick="startPractice('${cat}')" style="background:${color}; color:white; border:none; padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:bold; width: 100%;">Bu Konuya Çalış</button>` : ''}
            </div>
        `;
    }
    
    resultsHtml += '</div>';
    resultsHtml += '<div style="margin-top:40px; display:flex; gap:20px; justify-content:center;">';
    resultsHtml += '<button onclick="location.reload()" style="padding:20px 40px; font-size:24px; font-weight:bold; border-radius:10px; border:none; background:#3498db; color:white; cursor:pointer; box-shadow: 0 5px 0 #2980b9;">Ana Menüye Dön</button>';
    resultsHtml += '</div>';
    
    content.innerHTML = resultsHtml;
}

// Prevent context menu (right click / long press)
document.addEventListener('contextmenu', event => event.preventDefault());

// Start
initEngine();
