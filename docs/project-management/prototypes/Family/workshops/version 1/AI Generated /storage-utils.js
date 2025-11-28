// LocalStorage utility functions for Family Constitution Builder
// Handles saving and loading data between pages

const STORAGE_KEYS = {
    PHASE1_RESPONSES: 'fcb_phase1_responses',
    PHASE2_RESPONSES: 'fcb_phase2_responses',
    PRIORITY_AREAS: 'fcb_priority_areas',
    ARTIFACTS: 'fcb_artifacts',
    ADVISOR_EDITS: 'fcb_advisor_edits',
    CURRENT_SECTION: 'fcb_current_section',
    VIEW_MODE: 'fcb_view_mode'
};

// Save Phase 1 responses
function savePhase1Responses(responses) {
    localStorage.setItem(STORAGE_KEYS.PHASE1_RESPONSES, JSON.stringify(responses));
}

// Load Phase 1 responses
function loadPhase1Responses() {
    const data = localStorage.getItem(STORAGE_KEYS.PHASE1_RESPONSES);
    return data ? JSON.parse(data) : Array(12).fill(null).map(() => Array(5).fill(null));
}

// Save current section index
function saveCurrentSection(sectionIndex) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_SECTION, sectionIndex.toString());
}

// Load current section index
function loadCurrentSection() {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_SECTION);
    return data ? parseInt(data) : 0;
}

// Save Phase 2 responses
function savePhase2Responses(responses) {
    localStorage.setItem(STORAGE_KEYS.PHASE2_RESPONSES, JSON.stringify(responses));
}

// Load Phase 2 responses
function loadPhase2Responses() {
    const data = localStorage.getItem(STORAGE_KEYS.PHASE2_RESPONSES);
    return data ? JSON.parse(data) : {};
}

// Save priority areas
function savePriorityAreas(areas) {
    localStorage.setItem(STORAGE_KEYS.PRIORITY_AREAS, JSON.stringify(areas));
}

// Load priority areas
function loadPriorityAreas() {
    const data = localStorage.getItem(STORAGE_KEYS.PRIORITY_AREAS);
    return data ? JSON.parse(data) : [];
}

// Save generated artifacts
function saveArtifacts(artifacts) {
    localStorage.setItem(STORAGE_KEYS.ARTIFACTS, JSON.stringify(artifacts));
}

// Load generated artifacts
function loadArtifacts() {
    const data = localStorage.getItem(STORAGE_KEYS.ARTIFACTS);
    return data ? JSON.parse(data) : null;
}

// Save advisor edits
function saveAdvisorEdits(edits) {
    localStorage.setItem(STORAGE_KEYS.ADVISOR_EDITS, JSON.stringify(edits));
}

// Load advisor edits
function loadAdvisorEdits() {
    const data = localStorage.getItem(STORAGE_KEYS.ADVISOR_EDITS);
    return data ? JSON.parse(data) : {};
}

// Save view mode (client/advisor)
function saveViewMode(mode) {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
}

// Load view mode
function loadViewMode() {
    return localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'client';
}

// Load demo data into localStorage
function loadDemoData() {
    if (typeof DEMO_DATA !== 'undefined') {
        savePhase1Responses(DEMO_DATA.phase1);
        savePhase2Responses(DEMO_DATA.phase2);

        // Calculate priority areas from demo phase1 data
        const scores = DEMO_DATA.phase1.map((sectionResponses, idx) => {
            const sum = sectionResponses.reduce((a, b) => a + b, 0);
            const avg = sum / sectionResponses.length;
            return {
                score: avg,
                section: SECTIONS[idx],
                index: idx + 1
            };
        });

        const priorityAreas = scores
            .filter(item => item.score < 2.5)
            .sort((a, b) => a.score - b.score)
            .slice(0, 3);

        savePriorityAreas(priorityAreas);

        return true;
    }
    return false;
}

// Clear all stored data
function clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}

// Check if Phase 1 is complete
function isPhase1Complete() {
    const responses = loadPhase1Responses();
    return responses.every(section => section.every(answer => answer !== null));
}

// Check if Phase 2 is complete
function isPhase2Complete() {
    const priorityAreas = loadPriorityAreas();
    const phase2Responses = loadPhase2Responses();

    if (priorityAreas.length === 0) return false;

    // Check if all priority areas have responses
    return priorityAreas.every(area => {
        const areaResponses = phase2Responses[area.section.id];
        if (!areaResponses) return false;

        // Get questions for this area
        const questions = PHASE2_QUESTIONS[area.section.id];
        if (!questions) return false;

        // Check if all questions are answered
        return questions.every(q => {
            const answer = areaResponses[q.id];
            return answer && answer.trim().length > 0;
        });
    });
}

// Calculate section scores from Phase 1 responses
function calculateSectionScores() {
    const responses = loadPhase1Responses();
    return responses.map((sectionResponses, idx) => {
        const sum = sectionResponses.reduce((a, b) => a + (b || 0), 0);
        const avg = sum / sectionResponses.length;
        return {
            sectionId: idx + 1,
            score: avg,
            section: SECTIONS[idx]
        };
    });
}

// Get overall assessment score
function getOverallScore() {
    const scores = calculateSectionScores();
    const sum = scores.reduce((a, b) => a + b.score, 0);
    return (sum / scores.length).toFixed(1);
}

// Export progress data (for download/backup)
function exportProgressData() {
    return {
        phase1: loadPhase1Responses(),
        phase2: loadPhase2Responses(),
        priorityAreas: loadPriorityAreas(),
        artifacts: loadArtifacts(),
        advisorEdits: loadAdvisorEdits(),
        exportDate: new Date().toISOString()
    };
}

// Import progress data (from backup)
function importProgressData(data) {
    if (data.phase1) savePhase1Responses(data.phase1);
    if (data.phase2) savePhase2Responses(data.phase2);
    if (data.priorityAreas) savePriorityAreas(data.priorityAreas);
    if (data.artifacts) saveArtifacts(data.artifacts);
    if (data.advisorEdits) saveAdvisorEdits(data.advisorEdits);
}
