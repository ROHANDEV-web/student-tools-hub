document.addEventListener('DOMContentLoaded', () => {
    const academicContainer = document.getElementById('academic-tools-container');
    const mathContainer = document.getElementById('math-tools-container');
    const writingContainer = document.getElementById('writing-tools-container');
    const utilityContainer = document.getElementById('utility-tools-container');
    const searchInput = document.getElementById('tool-search');
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');

    // Render Tools Function
    const renderTools = (filter = '') => {
        // Clear containers
        academicContainer.innerHTML = '';
        mathContainer.innerHTML = '';
        writingContainer.innerHTML = '';
        utilityContainer.innerHTML = '';

        const filteredTools = TOOLS_DATA.filter(tool =>
            tool.name.toLowerCase().includes(filter.toLowerCase()) ||
            tool.description.toLowerCase().includes(filter.toLowerCase()) ||
            tool.category.toLowerCase().includes(filter.toLowerCase())
        );

        filteredTools.forEach(tool => {
            const card = document.createElement('div');
            card.className = "tool-card bg-white p-6 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 transition-all group animate-fade-in";
            card.innerHTML = `
                <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    ${tool.icon}
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">${tool.name}</h3>
                <p class="text-sm text-slate-500 line-clamp-2">${tool.description}</p>
                <div class="mt-4 flex items-center text-indigo-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool 
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            `;

            card.addEventListener('click', () => openTool(tool));

            // Append to correct category
            if (tool.category === 'academic') academicContainer.appendChild(card);
            else if (tool.category === 'math') mathContainer.appendChild(card);
            else if (tool.category === 'writing') writingContainer.appendChild(card);
            else if (tool.category === 'utility') utilityContainer.appendChild(card);
        });

        // Hide sections if empty (during search)
        document.querySelectorAll('section').forEach(section => {
            const container = section.querySelector('div[id$="-tools-container"]');
            if (container) {
                section.style.display = container.children.length > 0 ? 'block' : 'none';
            }
        });
    };

    // Open Tool Modal
    const openTool = (tool) => {
        modalTitle.textContent = tool.name;
        modalContent.innerHTML = tool.html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scroll

        // Initialize tool logic
        if (tool.logic) tool.logic();
    };

    // Close Modal
    const handleCloseModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modalContent.innerHTML = ''; // Clean up
    };

    closeModal.addEventListener('click', handleCloseModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) handleCloseModal();
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        renderTools(e.target.value);
    });

    // Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu (Simple alert for now as per minimal requirement)
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        alert("Menu options: Academic, Math, Writing, Utilities. Scroll to sections.");
    });

    // Initial Render
    renderTools();
});
