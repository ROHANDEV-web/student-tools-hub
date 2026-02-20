const TOOLS_DATA = [
    // ACADEMIC TOOLS
    {
        id: 'percentage-calc',
        name: 'Percentage Calculator',
        description: 'Calculate percentages of marks, discounts, and more.',
        icon: '📊',
        category: 'academic',
        html: `
            <div class="space-y-4 font-inter text-slate-700">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">Marks Obtained</label>
                        <input type="number" id="perc-obtained" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all" placeholder="450">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Total Marks</label>
                        <input type="number" id="perc-total" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all" placeholder="500">
                    </div>
                </div>
                <button onclick="calculatePercentage()" class="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">Calculate Now</button>
                <div id="perc-result" class="hidden p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
                    <div class="text-sm text-indigo-600 font-medium mb-1">Resulting Percentage</div>
                    <div id="perc-val" class="text-3xl font-extrabold text-indigo-900">0%</div>
                </div>
            </div>
        `,
        logic: () => {
            window.calculatePercentage = () => {
                const obtained = parseFloat(document.getElementById('perc-obtained').value);
                const total = parseFloat(document.getElementById('perc-total').value);
                const resultDiv = document.getElementById('perc-result');
                const valDiv = document.getElementById('perc-val');
                if (isNaN(obtained) || isNaN(total) || total === 0) return;
                const percentage = ((obtained / total) * 100).toFixed(2);
                valDiv.textContent = `${percentage}%`;
                resultDiv.classList.remove('hidden');
            };
        }
    },
    {
        id: 'cgpa-calc',
        name: 'CGPA to Percentage',
        description: 'Convert your academic CGPA to equivalent percentage points.',
        icon: '🎓',
        category: 'academic',
        html: `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">Enter CGPA (Scale of 10)</label>
                    <input type="number" step="0.01" id="cgpa-input" class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100" placeholder="8.5">
                </div>
                <button onclick="convertCGPA()" class="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all">Convert Instantly</button>
                <div id="cgpa-result" class="hidden p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
                    <div class="text-sm text-indigo-600 font-medium mb-1">Equivalent Percentage</div>
                    <div id="cgpa-val" class="text-3xl font-extrabold text-indigo-900">0%</div>
                    <p class="text-xs text-indigo-400 mt-2">Based on standard 9.5 multiplier</p>
                </div>
            </div>
        `,
        logic: () => {
            window.convertCGPA = () => {
                const cgpa = parseFloat(document.getElementById('cgpa-input').value);
                const resultDiv = document.getElementById('cgpa-result');
                const valDiv = document.getElementById('cgpa-val');
                if (isNaN(cgpa)) return;
                valDiv.textContent = `${(cgpa * 9.5).toFixed(2)}%`;
                resultDiv.classList.remove('hidden');
            };
        }
    },
    {
        id: 'gpa-calc',
        name: 'GPA Calculator',
        description: 'Semester GPA calculator with variable credits and grades.',
        icon: '📈',
        category: 'academic',
        html: `
            <div class="space-y-4">
                <div id="course-list" class="space-y-3">
                    <div class="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="Credits" class="credits w-full px-4 py-3 rounded-xl border border-slate-200">
                        <select class="grade w-full px-4 py-3 rounded-xl border border-slate-200">
                            <option value="4">A (4.0)</option>
                            <option value="3.5">B+ (3.5)</option>
                            <option value="3">B (3.0)</option>
                            <option value="2.5">C+ (2.5)</option>
                            <option value="2">C (2.0)</option>
                        </select>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button onclick="addCourse()" class="flex-1 py-3 border border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all">+ Add Course</button>
                    <button onclick="calculateGPA()" class="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700">Calculate GPA</button>
                </div>
                <div id="gpa-result" class="hidden p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
                    <div class="text-sm text-indigo-600 font-medium mb-1">Your Semester GPA</div>
                    <div id="gpa-val" class="text-3xl font-extrabold text-indigo-900">0.00</div>
                </div>
            </div>
        `,
        logic: () => {
            window.addCourse = () => {
                const div = document.createElement('div');
                div.className = "grid grid-cols-2 gap-3 animate-fade-in";
                div.innerHTML = `
                    <input type="number" placeholder="Credits" class="credits w-full px-4 py-3 rounded-xl border border-slate-200">
                    <select class="grade w-full px-4 py-3 rounded-xl border border-slate-200">
                        <option value="4">A (4.0)</option>
                        <option value="3.5">B+ (3.5)</option>
                        <option value="3">B (3.0)</option>
                        <option value="2.5">C+ (2.5)</option>
                        <option value="2">C (2.0)</option>
                    </select>
                `;
                document.getElementById('course-list').appendChild(div);
            };
            window.calculateGPA = () => {
                const credits = document.querySelectorAll('.credits');
                const grades = document.querySelectorAll('.grade');
                let totalPts = 0, totalCreds = 0;
                credits.forEach((c, i) => {
                    const cr = parseFloat(c.value);
                    const gr = parseFloat(grades[i].value);
                    if (!isNaN(cr)) { totalPts += (cr * gr); totalCreds += cr; }
                });
                if (totalCreds > 0) {
                    document.getElementById('gpa-val').textContent = (totalPts / totalCreds).toFixed(2);
                    document.getElementById('gpa-result').classList.remove('hidden');
                }
            };
        }
    },
    {
        id: 'attendance-calc',
        name: 'Attendance Analyzer',
        description: 'Know exactly how many classes you can skip or need to attend.',
        icon: '📅',
        category: 'academic',
        html: `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">Total Classes</label>
                        <input type="number" id="att-total" class="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="40">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Classes Present</label>
                        <input type="number" id="att-present" class="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="30">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold mb-2">Required Percentage (%)</label>
                    <input type="number" id="att-req" class="w-full px-4 py-3 rounded-xl border border-slate-200" value="75">
                </div>
                <button onclick="calculateAttendance()" class="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700">Analyze Now</button>
                <div id="att-result" class="hidden p-6 rounded-2xl border text-center font-medium"></div>
            </div>
        `,
        logic: () => {
            window.calculateAttendance = () => {
                const total = parseInt(document.getElementById('att-total').value);
                const present = parseInt(document.getElementById('att-present').value);
                const req = parseInt(document.getElementById('att-req').value);
                const res = document.getElementById('att-result');
                if (isNaN(total) || isNaN(present)) return;
                const current = (present / total) * 100;
                res.classList.remove('hidden');
                if (current >= req) {
                    const canSkip = Math.floor((present * 100 / req) - total);
                    res.className = "p-6 rounded-2xl bg-emerald-50 border-emerald-100 text-emerald-800 animate-fade-in";
                    res.innerHTML = `<div class="text-3xl font-bold mb-1">${current.toFixed(1)}%</div>You can skip <b>${canSkip}</b> more classes safely.`;
                } else {
                    const need = Math.ceil((req * total - 100 * present) / (100 - req));
                    res.className = "p-6 rounded-2xl bg-rose-50 border-rose-100 text-rose-800 animate-fade-in";
                    res.innerHTML = `<div class="text-3xl font-bold mb-1">${current.toFixed(1)}%</div>You must attend <b>${need}</b> more classes to reach ${req}%.`;
                }
            };
        }
    },
    {
        id: 'pomodoro',
        name: 'Pomodoro Study Timer',
        description: '25-minute focus session followed by a 5-minute break.',
        icon: '⏲️',
        category: 'academic',
        html: `
            <div class="text-center py-6">
                <div class="inline-flex items-center justify-center w-48 h-48 rounded-full border-8 border-indigo-50 bg-white shadow-xl mb-8">
                    <span id="timer-display" class="text-5xl font-mono font-bold text-slate-800">25:00</span>
                </div>
                <div class="flex gap-4 justify-center">
                    <button id="timer-btn" onclick="toggleTimer()" class="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Start Timer</button>
                    <button onclick="resetTimer()" class="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>
                </div>
                <div class="flex justify-center gap-3 mt-8">
                    <button onclick="setTimerType('work')" class="text-xs font-bold px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100">💻 Work (25m)</button>
                    <button onclick="setTimerType('break')" class="text-xs font-bold px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100">☕ Break (5m)</button>
                </div>
            </div>
        `,
        logic: () => {
            let timeLeft = 25 * 60; let timerId = null; let isRunning = false;
            window.updateDisplay = () => {
                const m = Math.floor(timeLeft / 60); const s = timeLeft % 60;
                document.getElementById('timer-display').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            };
            window.toggleTimer = () => {
                const btn = document.getElementById('timer-btn');
                if (isRunning) { clearInterval(timerId); btn.textContent = "Resume"; btn.classList.replace('bg-rose-600', 'bg-indigo-600'); }
                else {
                    timerId = setInterval(() => { if (timeLeft > 0) { timeLeft--; updateDisplay(); } else { clearInterval(timerId); alert("Time's up!"); resetTimer(); } }, 1000);
                    btn.textContent = "Pause"; btn.classList.replace('bg-indigo-600', 'bg-rose-600');
                }
                isRunning = !isRunning;
            };
            window.resetTimer = () => { clearInterval(timerId); isRunning = false; timeLeft = 25 * 60; updateDisplay(); document.getElementById('timer-btn').textContent = "Start Timer"; };
            window.setTimerType = (t) => { timeLeft = t === 'work' ? 25 * 60 : 5 * 60; resetTimer(); };
        }
    },

    // MATH TOOLS
    {
        id: 'bmi-calc',
        name: 'BMI Health Tracker',
        description: 'Quickly calculate your Health Index using height and weight.',
        icon: '⚖️',
        category: 'math',
        html: `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">Weight (kg)</label>
                        <input type="number" id="bmi-w" class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="70">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Height (cm)</label>
                        <input type="number" id="bmi-h" class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="175">
                    </div>
                </div>
                <button onclick="calculateBMI()" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700">Check Results</button>
                <div id="bmi-res" class="hidden p-6 rounded-2xl border text-center animate-fade-in"></div>
            </div>
        `,
        logic: () => {
            window.calculateBMI = () => {
                const w = parseFloat(document.getElementById('bmi-w').value);
                const h = parseFloat(document.getElementById('bmi-h').value) / 100;
                const res = document.getElementById('bmi-res');
                if (isNaN(w) || isNaN(h)) return;
                const bmi = (w / (h * h)).toFixed(1);
                let cat = "Normal", clr = "bg-emerald-50 text-emerald-800 border-emerald-100";
                if (bmi < 18.5) { cat = "Underweight"; clr = "bg-sky-50 text-sky-800 border-sky-100"; }
                else if (bmi >= 25 && bmi < 30) { cat = "Overweight"; clr = "bg-amber-50 text-amber-800 border-amber-100"; }
                else if (bmi >= 30) { cat = "Obese"; clr = "bg-rose-50 text-rose-800 border-rose-100"; }
                res.className = `p-6 rounded-2xl border text-center animate-fade-in ${clr}`;
                res.innerHTML = `<div class="text-4xl font-black mb-1">${bmi}</div><div class="font-bold uppercase tracking-widest text-xs opacity-70">${cat}</div>`;
                res.classList.remove('hidden');
            };
        }
    },
    {
        id: 'age-calc',
        name: 'Exact Age Calculator',
        description: 'Find your precise age down to the remaining days.',
        icon: '🎂',
        category: 'math',
        html: `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">Your Date of Birth</label>
                    <input type="date" id="dob-in" class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                </div>
                <button onclick="calculateAge()" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700">Calculate Age</button>
                <div id="age-res" class="hidden p-6 bg-emerald-50 border-emerald-100 text-emerald-800 rounded-2xl text-center animate-fade-in">
                    <div id="age-years" class="text-4xl font-black mb-1">0 Years</div>
                    <div id="age-details" class="text-sm font-medium opacity-70">0 months and 0 days old</div>
                </div>
            </div>
        `,
        logic: () => {
            window.calculateAge = () => {
                const dob = new Date(document.getElementById('dob-in').value);
                const today = new Date(); if (isNaN(dob)) return;
                let y = today.getFullYear() - dob.getFullYear();
                let m = today.getMonth() - dob.getMonth();
                let d = today.getDate() - dob.getDate();
                if (d < 0) { m--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
                if (m < 0) { y--; m += 12; }
                document.getElementById('age-years').textContent = `${y} Years`;
                document.getElementById('age-details').textContent = `${m} months and ${d} days old`;
                document.getElementById('age-res').classList.remove('hidden');
            };
        }
    },

    // WRITING TOOLS
    {
        id: 'word-counter',
        name: 'Essay & Word Counter',
        description: 'Real-time text analysis for words, characters, and paragraphs.',
        icon: '📝',
        category: 'writing',
        html: `
            <div class="space-y-4">
                <textarea id="word-txt" class="w-full h-48 px-4 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-amber-100 placeholder:text-slate-300 transition-all" placeholder="Start typing or paste your content here..."></textarea>
                <div class="grid grid-cols-3 gap-3">
                    <div class="p-4 bg-amber-50 rounded-2xl text-center border border-amber-100">
                        <div class="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Words</div>
                        <div id="w-count" class="text-2xl font-black text-amber-900">0</div>
                    </div>
                    <div class="p-4 bg-amber-50 rounded-2xl text-center border border-amber-100">
                        <div class="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Chars</div>
                        <div id="c-count" class="text-2xl font-black text-amber-900">0</div>
                    </div>
                    <div class="p-4 bg-amber-50 rounded-2xl text-center border border-amber-100">
                        <div class="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Paras</div>
                        <div id="p-count" class="text-2xl font-black text-amber-900">0</div>
                    </div>
                </div>
            </div>
        `,
        logic: () => {
            const area = document.getElementById('word-txt');
            area.addEventListener('input', () => {
                const val = area.value.trim();
                document.getElementById('w-count').textContent = val ? val.split(/\s+/).length : 0;
                document.getElementById('c-count').textContent = val.length;
                document.getElementById('p-count').textContent = val ? val.split(/\n+/).length : 0;
            });
        }
    },
    {
        id: 'title-gen',
        name: 'Essay Title Generator',
        description: 'Stuck? Generate catchy titles for your assignments.',
        icon: '💡',
        category: 'writing',
        html: `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">Topic or Keywords</label>
                    <input type="text" id="topic-in" class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-amber-100" placeholder="e.g. Climate Change">
                </div>
                <button onclick="generateTitles()" class="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700">Generate Ideas</button>
                <ul id="titles-res" class="hidden space-y-2"></ul>
            </div>
        `,
        logic: () => {
            window.generateTitles = () => {
                const topic = document.getElementById('topic-in').value || "Research";
                const templates = [`The Impact of ${topic} in 2026`, `Why ${topic} Matters More Than Ever`, `Analyzing the Future of ${topic}`, `${topic}: A Modern Perspective`, `The Paradox of ${topic} in Education`];
                const res = document.getElementById('titles-res'); res.innerHTML = '';
                templates.forEach(t => {
                    const li = document.createElement('li'); li.className = "p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium hover:bg-white hover:shadow-sm cursor-pointer transition-all";
                    li.textContent = t; li.onclick = () => { navigator.clipboard.writeText(t); alert("Title copied!"); };
                    res.appendChild(li);
                });
                res.classList.remove('hidden');
            };
        }
    },

    // UTILITY TOOLS
    {
        id: 'password-gen',
        name: 'Secure Password Gen',
        description: 'Military-grade random passwords for your security.',
        icon: '🔐',
        category: 'utility',
        html: `
            <div class="space-y-4">
                <div class="p-6 bg-slate-900 text-indigo-400 rounded-2xl relative group border-4 border-slate-800">
                    <span id="pass-val" class="text-xl font-mono font-bold break-all">C-78q@Xm#9</span>
                    <button onclick="copyPass()" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-800 text-indigo-300 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </button>
                </div>
                <div>
                    <div class="flex justify-between text-sm font-bold mb-2">Length: <span id="l-num">12</span></div>
                    <input type="range" id="l-in" min="8" max="40" value="12" class="w-full accent-rose-600">
                </div>
                <button onclick="generatePass()" class="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-100">Generate New Password</button>
            </div>
        `,
        logic: () => {
            const range = document.getElementById('l-in');
            range.addEventListener('input', () => document.getElementById('l-num').textContent = range.value);
            window.generatePass = () => {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
                let pass = ""; for (let i = 0; i < range.value; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
                document.getElementById('pass-val').textContent = pass;
            };
            window.copyPass = () => { navigator.clipboard.writeText(document.getElementById('pass-val').textContent); alert("Password Copied!"); };
        }
    },
    {
        id: 'name-picker',
        name: 'Random Name Picker',
        description: 'Fair and fun way to pick a winner from a group.',
        icon: '🎯',
        category: 'utility',
        html: `
            <div class="space-y-4">
                <textarea id="names-in" class="w-full h-32 px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-rose-100" placeholder="Rohan, Sarah, Alex..."></textarea>
                <button onclick="pickWinner()" class="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700">Pick Randomly</button>
                <div id="winner-res" class="hidden p-8 bg-rose-50 border-rose-100 text-rose-900 rounded-3xl text-center animate-bounce">
                    <div class="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">And the winner is...</div>
                    <div id="winner-val" class="text-4xl font-black">Winner!</div>
                </div>
            </div>
        `,
        logic: () => {
            window.pickWinner = () => {
                const names = document.getElementById('names-in').value.split(/[,\n]/).filter(n => n.trim() !== "");
                if (names.length === 0) return;
                const winner = names[Math.floor(Math.random() * names.length)].trim();
                document.getElementById('winner-val').textContent = winner;
                document.getElementById('winner-res').classList.remove('hidden');
            }
        }
    },
    {
        id: 'emi-calc',
        name: 'Student Loan EMI',
        description: 'Plan your education finances by calculating monthly loan EMIs.',
        icon: '💸',
        category: 'math',
        html: `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">Loan Amount ($)</label>
                    <input type="number" id="emi-p" class="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="10000">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">Interest Rate (%)</label>
                        <input type="number" id="emi-r" class="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="12">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Tenure (Years)</label>
                        <input type="number" id="emi-t" class="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="1">
                    </div>
                </div>
                <button onclick="calculateMonthlyEMI()" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700">Calculate EMI</button>
                <div id="emi-res-card" class="hidden p-6 bg-emerald-50 border-emerald-100 rounded-2xl text-center animate-fade-in">
                    <div class="text-sm font-bold opacity-60">Monthly Payment</div>
                    <div id="emi-val" class="text-4xl font-black text-emerald-900">$0.00</div>
                </div>
            </div>
        `,
        logic: () => {
            window.calculateMonthlyEMI = () => {
                const p = parseFloat(document.getElementById('emi-p').value);
                const r = parseFloat(document.getElementById('emi-r').value) / 12 / 100;
                const n = parseFloat(document.getElementById('emi-t').value) * 12;
                if (isNaN(p) || isNaN(r) || isNaN(n)) return;
                const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                document.getElementById('emi-val').textContent = `$${emi.toFixed(2)}`;
                document.getElementById('emi-res-card').classList.remove('hidden');
            };
        }
    },
    {
        id: 'unit-conv',
        name: 'Smart Unit Converter',
        description: 'Fast conversion between commonly used academic units.',
        icon: '📏',
        category: 'utility',
        html: `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">Convert From (Meters)</label>
                    <input type="number" id="unit-val-in" class="w-full px-4 py-3 rounded-xl border border-slate-200" value="1">
                </div>
                <div class="grid grid-cols-2 gap-2" id="unit-btns">
                    <button onclick="convert('cm')" class="p-3 bg-slate-100 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all">To CM</button>
                    <button onclick="convert('km')" class="p-3 bg-slate-100 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all">To KM</button>
                    <button onclick="convert('feet')" class="p-3 bg-slate-100 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all">To FEET</button>
                    <button onclick="convert('inch')" class="p-3 bg-slate-100 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all">To INCH</button>
                </div>
                <div id="unit-res-box" class="hidden p-6 bg-rose-50 border-rose-100 text-rose-900 rounded-2xl text-center">
                    <div id="unit-final" class="text-3xl font-black">0</div>
                </div>
            </div>
        `,
        logic: () => {
            window.convert = (type) => {
                const val = parseFloat(document.getElementById('unit-val-in').value);
                const resBox = document.getElementById('unit-res-box');
                const resVal = document.getElementById('unit-final');
                let result = 0;
                if (type === 'cm') result = val * 100;
                else if (type === 'km') result = val / 1000;
                else if (type === 'feet') result = val * 3.28084;
                else if (type === 'inch') result = val * 39.3701;
                resVal.textContent = result.toFixed(2);
                resBox.classList.remove('hidden');
            };
        }
    }
];
