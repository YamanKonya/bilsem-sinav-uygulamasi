// c:\Bilsem\questions.js
window.QuestionDatabase = {};

function getRandom(arr, n) {
    let shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const makeImg = (filename) => `<img src="assets/img/${filename}" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 5px 5px rgba(0,0,0,0.15)); pointer-events:none; user-select:none;">`;

const emojis = [
    makeImg('cute_bee_1780557959011.png'),
    makeImg('cute_caterpillar_1780558213108.png'),
    makeImg('cute_chicken_1780558001173.png'),
    makeImg('cute_cloud_1780558021041.png'),
    makeImg('cute_cow_1780557938361.png'),
    makeImg('cute_egg_1780558011274.png'),
    makeImg('cute_fish_1780556564427.png'),
    makeImg('cute_honey_1780557970093.png'),
    makeImg('cute_house_1780556597593.png'),
    makeImg('cute_milk_1780557948289.png'),
    makeImg('cute_puppy_1780556554077.png'),
    makeImg('cute_rain_1780558031314.png'),
    makeImg('cute_sheep_1780557980413.png'),
    makeImg('cute_sun_1780558194457.png'),
    makeImg('cute_sunflower_1780558203561.png'),
    makeImg('cute_tree_1780556584954.png'),
    makeImg('cute_yarn_1780557990590.png')
];

// Categories map
const CATS = ['MEMORY_1', 'MEMORY_2', 'MEMORY_3', 'MATRIX', 'CUBES', 'CIPHER', 'SHADOW', 'PATCH', 'ROTATION', 'PATTERN', 'ANALOGY', 'EQUATION'];
CATS.forEach(c => window.QuestionDatabase[c] = []);

// 1. MEMORY_1
for(let i=0; i<100; i++) {
    const items = getRandom(emojis, 4);
    const target = items[0];
    const options = getRandom(items, 4);
    window.QuestionDatabase.MEMORY_1.push({
        categoryId: 'MEMORY_1', template: 'memory-timer', theme: 'theme-green',
        instructionHTML: 'Resme dikkatlice bakınız. Ekranda kaybolunca doğru görseli şıklardan bulunuz.',
        itemsHTML: [`<div style="width:250px; height:250px; display:flex; justify-content:center; align-items:center;">${target}</div>`],
        hiddenIndex: 0, displayMs: 5000,
        optionsHTML: options.map(e => `<div style="width:120px; height:120px; display:flex; justify-content:center; align-items:center;">${e}</div>`),
        correctOptionIndex: options.indexOf(target)
    });
}

// 2. MEMORY_2
for(let i=0; i<100; i++) {
    const all = getRandom(emojis, 5);
    const hiddenIndex = Math.floor(Math.random() * 2);
    const target = all[hiddenIndex];
    const options = getRandom([target, all[2], all[3], all[4]], 4);
    window.QuestionDatabase.MEMORY_2.push({
        categoryId: 'MEMORY_2', template: 'memory-timer', theme: 'theme-green',
        instructionHTML: 'Görsellere dikkatlice bakınız. Kaybolan görseli bulunuz.',
        itemsHTML: [`<div style="width:180px; height:180px;">${all[0]}</div>`, `<div style="width:180px; height:180px;">${all[1]}</div>`],
        hiddenIndex: hiddenIndex, displayMs: 5000,
        optionsHTML: options.map(e => `<div style="width:110px; height:110px;">${e}</div>`),
        correctOptionIndex: options.indexOf(target)
    });
}

// 3. MEMORY_3
for(let i=0; i<100; i++) {
    const all = getRandom(emojis, 6);
    const hiddenIndex = Math.floor(Math.random() * 3);
    const target = all[hiddenIndex];
    const options = getRandom([target, all[3], all[4], all[5]], 4);
    window.QuestionDatabase.MEMORY_3.push({
        categoryId: 'MEMORY_3', template: 'memory-timer', theme: 'theme-green',
        instructionHTML: 'Görsellerin sırasına dikkatlice bakınız. Kaybolan görseli bulunuz.',
        itemsHTML: [`<div style="width:150px; height:150px;">${all[0]}</div>`, `<div style="width:150px; height:150px;">${all[1]}</div>`, `<div style="width:150px; height:150px;">${all[2]}</div>`],
        hiddenIndex: hiddenIndex, displayMs: 5000,
        optionsHTML: options.map(e => `<div style="width:100px; height:100px;">${e}</div>`),
        correctOptionIndex: options.indexOf(target)
    });
}

// 4. MATRIX (Counting / Growth)
for(let i=0; i<100; i++) {
    const items = getRandom(emojis, 3);
    const a = items[0], b = items[1], c = items[2];
    
    const grp = (emoji, count) => {
        let h = '';
        for(let k=0; k<count; k++) h += `<div style="width:30px; height:30px; margin:2px;">${emoji}</div>`;
        return `<div style="display:flex; justify-content:center; align-items:center; flex-wrap:wrap; width:100%; height:100%;">` + h + `</div>`;
    };

    const gridHtml = `
        <div style="display: grid; grid-template-columns: repeat(3, 100px); grid-template-rows: repeat(3, 100px); gap: 10px; text-align: center; border: 4px solid #333; padding: 10px; background: #f1f2f6; border-radius:10px;">
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(a,1)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(a,2)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(a,3)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(b,1)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(b,2)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(b,3)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(c,1)}</div>
            <div style="background:white; border:2px solid #ccc; display:flex; align-items:center; justify-content:center;">${grp(c,2)}</div>
            <div style="background:white; border:2px dashed #e74c3c; display:flex; align-items:center; justify-content:center; color:#e74c3c; font-size:50px; font-weight:bold;">?</div>
        </div>
    `;
    
    const target = grp(c,3);
    const options = getRandom([target, grp(c,1), grp(c,2), grp(c,4)], 4);
    
    window.QuestionDatabase.MATRIX.push({
        categoryId: 'MATRIX', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Soru işaretli yere hangi seçenek gelmelidir?',
        mainContentHTML: gridHtml,
        optionsHTML: options.map(o => `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">${o}</div>`),
        correctOptionIndex: options.indexOf(target), delayMs: 0
    });
}

// 5. CUBES
for(let i=0; i<100; i++) {
    const target = Math.floor(Math.random() * 15) + 8;
    const options = getRandom([target, target+1, target-1, target+2], 4);
    let rem = target;
    let cubesHtml = '';
    while(rem > 0) {
        let row = Math.min(rem, Math.floor(Math.random() * 4) + 1);
        cubesHtml += '🧊'.repeat(row) + '<br>';
        rem -= row;
    }
    window.QuestionDatabase.CUBES.push({
        categoryId: 'CUBES', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Şekilde en az kaç tane birim küp vardır?',
        mainContentHTML: `<div style="font-size: 80px; line-height: 1.1;">${cubesHtml}</div>`,
        optionsHTML: options.map(o => `<div style="font-size: 60px; font-weight:bold;">${o}</div>`),
        correctOptionIndex: options.indexOf(target), delayMs: 0
    });
}

// 6. CIPHER
const baseWords = ["BAL", "GUL", "TAS", "KUS", "SUT", "MUZ", "NAR", "CAM", "ZIL", "TOP", "KOL", "SAC", "BAS", "GOZ", "YOL", "YAZ", "KIS", "CAY", "KAR", "DAG", "BAG", "DAL"];
for(let i=0; i<100; i++) {
    const baseWord = baseWords[Math.floor(Math.random() * baseWords.length)];
    const perms = [
        baseWord,
        baseWord[1]+baseWord[0]+baseWord[2],
        baseWord[2]+baseWord[1]+baseWord[0],
        baseWord[1]+baseWord[2]+baseWord[0]
    ];
    const n1 = Math.floor(Math.random()*9)+1;
    const n2 = Math.floor(Math.random()*9)+1;
    const n3 = Math.floor(Math.random()*9)+1;
    const numbers = perms.map(w => {
        let n='';
        for(let c of w) {
            if(c===baseWord[0]) n+=n1;
            else if(c===baseWord[1]) n+=n2;
            else n+=n3;
        }
        return n;
    });
    const targetIdx = Math.floor(Math.random() * 4);
    const targetWord = perms[targetIdx];
    const targetNum = numbers[targetIdx];
    const options = getRandom([...numbers], 4);
    
    const html = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:20px; font-size: 28px; font-weight:bold;">
            <div style="display:flex; gap: 50px; background:#fff3cd; padding:20px 40px; border-radius:15px; border:3px solid #ffeaa7;">
                <div>${perms.join('<br>')}</div>
                <div style="color:red; font-size:60px; display:flex; align-items:center;">}</div>
                <div style="display:flex; align-items:center;">${getRandom(numbers, 4).join(', ')}</div>
            </div>
            <div style="background:#81ecec; padding:20px 50px; border-radius:15px; border:3px solid #00cec9;">İSTENEN: ${targetWord}</div>
        </div>
    `;
    window.QuestionDatabase.CIPHER.push({
        categoryId: 'CIPHER', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Sözcüğün sayısal eşleştirmesini bulunuz.',
        mainContentHTML: html,
        optionsHTML: options.map(o => `<div style="font-size: 50px; font-weight:bold; letter-spacing:10px;">${o}</div>`),
        correctOptionIndex: options.indexOf(targetNum), delayMs: 0
    });
}

// 7. SHADOW
const shadowEmojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦉', '🐺', '🐴', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🐢', '🐍', '🐙', '🦀', '🐠', '🐟', '🐬', '🐳', '🐘', '🐪', '🦒', '🐎', '🐏', '🐑', '🐐', '🦌', '🐕', '🐈', '🐓', '🦃', '🦜', '🦢', '🕊', '🐇', '🐀', '🐿', '🦔', '🚗', '🚕', '🚙', '🚌', '🚓', '🚑', '🚒', '🚐', '🚚', '🚜', '🚲', '🛵', '🏍', '🚁', '✈', '🚀', '🛸', '🛶', '⛵', '🚤', '🚢', '🌳', '🌲', '🌴', '🌵', '🌷', '🌸', '🌹', '🌺', '🌻', '🌼', '🍄'];
for(let i=0; i<100; i++) {
    const all = getRandom(shadowEmojis, 1);
    const target = all[0];
    
    const targetHTML = `<div style="font-size:150px; transform: scale(1); filter: brightness(0) drop-shadow(0 0 1px black);">${target}</div>`;
    const distractors = [
        `<div style="font-size:150px; transform: scaleX(-1); filter: brightness(0) drop-shadow(0 0 1px black);">${target}</div>`,
        `<div style="font-size:150px; transform: rotate(15deg); filter: brightness(0) drop-shadow(0 0 1px black);">${target}</div>`,
        `<div style="font-size:150px; transform: rotate(-15deg); filter: brightness(0) drop-shadow(0 0 1px black);">${target}</div>`,
        `<div style="font-size:150px; transform: scaleX(-1) rotate(10deg); filter: brightness(0) drop-shadow(0 0 1px black);">${target}</div>`
    ];
    
    const options = getRandom([targetHTML, distractors[0], distractors[1], distractors[2]], 4);
    
    window.QuestionDatabase.SHADOW.push({
        categoryId: 'SHADOW', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Yukarıdaki görselin doğru gölgesini (siyah halini) şıklardan bulunuz. Dikkat: Şıklar birbirine çok benzer!',
        mainContentHTML: `<div style="font-size:250px;">${target}</div>`,
        optionsHTML: options,
        correctOptionIndex: options.indexOf(targetHTML), delayMs: 0
    });
}

// 8. PATCH (Missing Piece 2x2 from 4x4)
for(let i=0; i<100; i++) {
    const patternEmojis = getRandom(emojis, 4);
    let fullGrid = [];
    for(let r=0; r<4; r++) {
        let row = [];
        for(let c=0; c<4; c++) {
            row.push(patternEmojis[(r+c) % 4]);
        }
        fullGrid.push(row);
    }
    
    const hideR = Math.floor(Math.random() * 3);
    const hideC = Math.floor(Math.random() * 3);
    
    let gridHTML = `<div style="display:grid; grid-template-columns:repeat(4, 70px); grid-template-rows:repeat(4, 70px); gap:2px; border:6px solid #2f3640; padding:2px; background:#2f3640;">`;
    
    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            if(r >= hideR && r < hideR+2 && c >= hideC && c < hideC+2) {
                if(r === hideR && c === hideC) {
                    gridHTML += `<div style="grid-row: span 2; grid-column: span 2; background:white; display:flex; align-items:center; justify-content:center; color:#e74c3c; font-size:60px; font-weight:bold; border:4px dashed #e74c3c; z-index:10;">?</div>`;
                }
            } else {
                gridHTML += `<div style="background:#f1f2f6; display:flex; align-items:center; justify-content:center; padding:10px;">${fullGrid[r][c]}</div>`;
            }
        }
    }
    gridHTML += `</div>`;
    
    const build2x2 = (r1, c1, r2, c2, r3, c3, r4, c4) => `
        <div style="display:grid; grid-template-columns:repeat(2, 45px); grid-template-rows:repeat(2, 45px); gap:2px; background:#2f3640; border:4px solid #e74c3c;">
            <div style="background:#f1f2f6; display:flex; align-items:center; justify-content:center; padding:5px;">${r1}</div>
            <div style="background:#f1f2f6; display:flex; align-items:center; justify-content:center; padding:5px;">${c1}</div>
            <div style="background:#f1f2f6; display:flex; align-items:center; justify-content:center; padding:5px;">${r2}</div>
            <div style="background:#f1f2f6; display:flex; align-items:center; justify-content:center; padding:5px;">${c2}</div>
        </div>
    `;
    
    const targetPiece = build2x2(fullGrid[hideR][hideC], fullGrid[hideR][hideC+1], fullGrid[hideR+1][hideC], fullGrid[hideR+1][hideC+1]);
    
    const distractor1 = build2x2(fullGrid[0][0], fullGrid[0][1], fullGrid[1][0], fullGrid[1][1]);
    const distractor2 = build2x2(fullGrid[2][2], fullGrid[2][3], fullGrid[3][2], fullGrid[3][3]);
    const distractor3 = build2x2(patternEmojis[0], patternEmojis[1], patternEmojis[3], patternEmojis[2]);
    
    let finalDistractors = [distractor1, distractor2, distractor3].filter(d => d !== targetPiece);
    while(finalDistractors.length < 3) {
        finalDistractors.push(build2x2(getRandom(patternEmojis,1)[0], getRandom(patternEmojis,1)[0], getRandom(patternEmojis,1)[0], getRandom(patternEmojis,1)[0]));
    }
    
    const options = getRandom([targetPiece, finalDistractors[0], finalDistractors[1], finalDistractors[2]], 4);
    
    window.QuestionDatabase.PATCH.push({
        categoryId: 'PATCH', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Büyük tablodan kesilip çıkarılan o kare parçayı şıklardan bulunuz.',
        mainContentHTML: gridHTML,
        optionsHTML: options,
        correctOptionIndex: options.indexOf(targetPiece), delayMs: 0
    });
}

// 9. ROTATION (90 Degree 3x3 Matrix)
for(let i=0; i<100; i++) {
    const startPos = Math.floor(Math.random()*4);
    const getDot = (pos) => {
        let align = '';
        if(pos%4 === 0) align = 'align-items:flex-start; justify-content:flex-start;';
        if(pos%4 === 1) align = 'align-items:flex-start; justify-content:flex-end;';
        if(pos%4 === 2) align = 'align-items:flex-end; justify-content:flex-end;';
        if(pos%4 === 3) align = 'align-items:flex-end; justify-content:flex-start;';
        return `<div style="width:70px; height:70px; border:4px solid #2c3e50; display:flex; ${align} padding:5px; background:white; border-radius:8px;"><div style="width:20px; height:20px; background:#e74c3c; border-radius:50%;"></div></div>`;
    };
    
    const html = `
        <div style="display:grid; grid-template-columns:repeat(3, 80px); grid-template-rows:repeat(3, 80px); gap:15px; border:4px solid #333; padding:20px; background:#f1f2f6; border-radius:15px;">
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos)}</div>
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+1)}</div>
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+2)}</div>
            
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+1)}</div>
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+2)}</div>
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+3)}</div>
            
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+2)}</div>
            <div style="display:flex; justify-content:center; align-items:center;">${getDot(startPos+3)}</div>
            <div style="width:70px; height:70px; border:4px dashed #e74c3c; display:flex; align-items:center; justify-content:center; font-size:40px; font-weight:bold; color:#e74c3c; background:white; border-radius:8px; margin:auto;">?</div>
        </div>
    `;
    const target = getDot(startPos+4);
    const options = getRandom([getDot(0), getDot(1), getDot(2), getDot(3)], 4);
    
    window.QuestionDatabase.ROTATION.push({
        categoryId: 'ROTATION', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Şekiller belirli bir kurala göre dönmektedir. Soru işareti yerine hangisi gelmelidir?',
        mainContentHTML: html,
        optionsHTML: options,
        correctOptionIndex: options.indexOf(target), delayMs: 0
    });
}

// 10. PATTERN (Sequence)
for(let i=0; i<100; i++) {
    const items = getRandom(emojis, 2);
    const a = items[0], b = items[1];
    const html = `
        <div style="display:flex; gap:15px; align-items:center; background:white; padding:20px; border-radius:15px; border:4px solid #2f3640;">
            <div style="width:80px; height:80px;">${a}</div>
            <div style="width:80px; height:80px;">${b}</div>
            <div style="width:80px; height:80px;">${a}</div>
            <div style="width:80px; height:80px;">${b}</div>
            <div style="width:80px; height:80px;">${a}</div>
            <div style="width:80px; height:80px; border:4px dashed #e74c3c; display:flex; align-items:center; justify-content:center; font-size:40px; font-weight:bold; color:#e74c3c; border-radius:10px;">?</div>
        </div>
    `;
    const options = getRandom([b, a, getRandom(emojis.filter(e=>e!==a&&e!==b),1)[0], getRandom(emojis.filter(e=>e!==a&&e!==b),1)[0]], 4);
    
    window.QuestionDatabase.PATTERN.push({
        categoryId: 'PATTERN', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Örüntüyü (Sıralamayı) tamamlayan görseli bulunuz.',
        mainContentHTML: html,
        optionsHTML: options.map(o => `<div style="width:90px; height:90px;">${o}</div>`),
        correctOptionIndex: options.indexOf(b), delayMs: 0
    });
}

// 11. ANALOGY (Benzeşim)
const analogyPairs = [
    [makeImg('cute_cow_1780557938361.png'), makeImg('cute_milk_1780557948289.png')],
    [makeImg('cute_bee_1780557959011.png'), makeImg('cute_honey_1780557970093.png')],
    [makeImg('cute_sheep_1780557980413.png'), makeImg('cute_yarn_1780557990590.png')],
    [makeImg('cute_chicken_1780558001173.png'), makeImg('cute_egg_1780558011274.png')],
    [makeImg('cute_cloud_1780558021041.png'), makeImg('cute_rain_1780558031314.png')],
    [makeImg('cute_sun_1780558194457.png'), makeImg('cute_sunflower_1780558203561.png')],
    [makeImg('cute_puppy_1780556554077.png'), makeImg('cute_house_1780556597593.png')]
];

for(let i=0; i<100; i++) {
    const pairs = getRandom(analogyPairs, 2);
    const p1 = pairs[0];
    const p2 = pairs[1];
    
    const html = `
        <div style="display:flex; flex-direction:column; gap:20px; background:#f1f2f6; padding:30px; border-radius:15px; border:4px solid #2f3640;">
            <div style="display:flex; gap:20px; align-items:center; background:white; padding:20px; border-radius:10px; border:3px solid #dfe4ea;">
                <div style="width:120px; height:120px;">${p1[0]}</div>
                <div style="font-size:50px; color:#3498db;">➡</div>
                <div style="width:120px; height:120px;">${p1[1]}</div>
            </div>
            <div style="display:flex; gap:20px; align-items:center; background:white; padding:20px; border-radius:10px; border:3px solid #dfe4ea;">
                <div style="width:120px; height:120px;">${p2[0]}</div>
                <div style="font-size:50px; color:#e74c3c;">➡</div>
                <div style="width:120px; height:120px; border:4px dashed #e74c3c; display:flex; align-items:center; justify-content:center; font-size:60px; font-weight:bold; color:#e74c3c; border-radius:10px;">?</div>
            </div>
        </div>
    `;
    
    const otherResults = analogyPairs.filter(p => p !== p2 && p !== p1).map(p => p[1]);
    const distractors = getRandom(otherResults, 3);
    const options = getRandom([p2[1], ...distractors], 4);
    
    window.QuestionDatabase.ANALOGY.push({
        categoryId: 'ANALOGY', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Üstteki iki görsel arasındaki ilişkiyi bularak, alttaki soru işaretli yere gelmesi gerekeni şıklardan seçiniz.',
        mainContentHTML: html,
        optionsHTML: options.map(o => `<div style="width:100px; height:100px;">${o}</div>`),
        correctOptionIndex: options.indexOf(p2[1]), delayMs: 0
    });
}

// 12. EQUATION (Şekil Şifreleri)
const cssShapes = [
    '<div style="width:50px;height:50px;background:#3498db;border-radius:50%;"></div>',
    '<div style="width:50px;height:50px;background:#e74c3c;border-radius:50%;"></div>',
    '<div style="width:50px;height:50px;background:#f1c40f;border-radius:50%;"></div>',
    '<div style="width:50px;height:50px;background:#2ecc71;border-radius:50%;"></div>',
    '<div style="width:50px;height:50px;background:#3498db;"></div>',
    '<div style="width:50px;height:50px;background:#e74c3c;"></div>',
    '<div style="width:50px;height:50px;background:#f1c40f;"></div>',
    '<div style="width:50px;height:50px;background:#2ecc71;"></div>',
    '<div style="width:0;height:0;border-left:25px solid transparent;border-right:25px solid transparent;border-bottom:50px solid #3498db;"></div>',
    '<div style="width:0;height:0;border-left:25px solid transparent;border-right:25px solid transparent;border-bottom:50px solid #e74c3c;"></div>',
    '<div style="width:0;height:0;border-left:25px solid transparent;border-right:25px solid transparent;border-bottom:50px solid #f1c40f;"></div>',
];
for(let i=0; i<100; i++) {
    const selectedShapes = getRandom(cssShapes, 6);
    
    const eq1 = [selectedShapes[0], selectedShapes[1], selectedShapes[2]];
    const eq2 = [selectedShapes[3], selectedShapes[4], selectedShapes[5]];
    
    const askEq = Math.random() > 0.5 ? eq1 : eq2;
    const askReverse = Math.random() > 0.5;
    
    const buildRow = (s1, s2, s3) => `
        <div style="display:flex; gap:10px; align-items:center; border:2px solid #dfe4ea; padding:10px 20px; background:white; border-radius:8px;">
            ${s1} <div style="font-size:30px; font-weight:bold;">+</div> ${s2} <div style="font-size:30px; font-weight:bold;">=</div> ${s3}
        </div>
    `;
    
    const html = `
        <div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; background:#f1f2f6; padding:20px; border-radius:15px; border:4px solid #2f3640;">
                ${buildRow(eq1[0], eq1[1], eq1[2])}
                ${buildRow(eq2[0], eq2[1], eq2[2])}
                ${buildRow(eq1[1], eq1[0], eq1[2])}
                ${buildRow(eq2[1], eq2[0], eq2[2])}
            </div>
            
            <div style="display:flex; gap:15px; align-items:center; background:#fff3cd; padding:20px 40px; border-radius:15px; border:4px solid #ffeaa7;">
                ${askReverse ? askEq[1] : askEq[0]} 
                <div style="font-size:40px; font-weight:bold; color:#e74c3c;">+</div> 
                ${askReverse ? askEq[0] : askEq[1]} 
                <div style="font-size:40px; font-weight:bold; color:#e74c3c;">=</div> 
                <div style="width:60px; height:60px; border:4px dashed #e74c3c; display:flex; align-items:center; justify-content:center; font-size:40px; font-weight:bold; color:#e74c3c; border-radius:8px;">?</div>
            </div>
        </div>
    `;
    
    const target = askEq[2];
    const distractors = getRandom(cssShapes.filter(s => s !== target), 3);
    const options = getRandom([target, ...distractors], 4);
    
    window.QuestionDatabase.EQUATION.push({
        categoryId: 'EQUATION', template: 'image-grid', theme: 'theme-green',
        instructionHTML: 'Tablodaki eşitliklere göre, alttaki işlemin sonucu hangi şekil olmalıdır?',
        mainContentHTML: html,
        optionsHTML: options,
        correctOptionIndex: options.indexOf(target), delayMs: 0
    });
}
