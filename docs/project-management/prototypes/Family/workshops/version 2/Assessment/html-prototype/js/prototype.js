/**
 * Family Governance Assessment - Prototype JavaScript
 * Version: 1.0
 *
 * This file contains shared functionality for the HTML prototype
 */

// Global state management
const AssessmentState = {
    role: null,
    privacy: null,
    mode: null,
    currentDimension: null,
    currentQuestion: null,
    answers: {},
    progress: 0,

    // Initialize from sessionStorage
    init() {
        this.role = sessionStorage.getItem('selectedRole');
        this.privacy = sessionStorage.getItem('selectedPrivacy');
        this.mode = sessionStorage.getItem('assessmentMode');
        this.answers = JSON.parse(sessionStorage.getItem('answers') || '{}');
        this.calculateProgress();
    },

    // Save answer
    saveAnswer(dimensionId, questionId, value, comment = '') {
        const answerKey = `${dimensionId}_${questionId}`;
        this.answers[answerKey] = {
            value,
            comment,
            timestamp: new Date().toISOString()
        };
        sessionStorage.setItem('answers', JSON.stringify(this.answers));
        this.calculateProgress();
    },

    // Calculate overall progress
    calculateProgress() {
        const totalQuestions = 105;
        const answeredCount = Object.keys(this.answers).length;
        this.progress = Math.round((answeredCount / totalQuestions) * 100);
        sessionStorage.setItem('progress', this.progress);
    },

    // Reset state
    reset() {
        sessionStorage.clear();
        this.answers = {};
        this.progress = 0;
    }
};

// Auto-save functionality
let autoSaveTimer = null;

function triggerAutoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        console.log('Auto-saving...');
        AssessmentState.init(); // Refresh state
        showAutoSaveIndicator();
    }, 30000); // Every 30 seconds
}

function showAutoSaveIndicator() {
    const indicator = document.querySelector('.auto-save-indicator');
    if (indicator) {
        indicator.textContent = '💾 Сохранено только что';
        indicator.style.color = 'var(--success)';

        setTimeout(() => {
            indicator.style.color = 'var(--gray-600)';
        }, 2000);
    }
}

// Dimension data
const DIMENSIONS = {
    1: {
        id: '1_communication_trust',
        name: 'Коммуникация и доверие',
        icon: '💬',
        color: '#4CAF50',
        questions: 12,
        weight: 'high'
    },
    2: {
        id: '2_financial_transparency',
        name: 'Финансовая прозрачность',
        icon: '💰',
        color: '#2196F3',
        questions: 14,
        weight: 'high'
    },
    3: {
        id: '3_next_generation',
        name: 'Развитие следующего поколения',
        icon: '👥',
        color: '#9C27B0',
        questions: 13,
        weight: 'high'
    },
    4: {
        id: '4_decision_making',
        name: 'Принятие решений и конфликты',
        icon: '⚖️',
        color: '#FF9800',
        questions: 15,
        weight: 'critical'
    },
    5: {
        id: '5_values_mission',
        name: 'Ценности и миссия',
        icon: '🧭',
        color: '#00BCD4',
        questions: 11,
        weight: 'medium'
    },
    6: {
        id: '6_governance_structures',
        name: 'Структуры управления',
        icon: '🏛️',
        color: '#3F51B5',
        questions: 16,
        weight: 'critical'
    },
    7: {
        id: '7_ownership_control',
        name: 'Владение и контроль',
        icon: '🔑',
        color: '#E91E63',
        questions: 14,
        weight: 'high'
    },
    8: {
        id: '8_family_identity',
        name: 'Семейная идентичность',
        icon: '❤️',
        color: '#8BC34A',
        questions: 10,
        weight: 'medium'
    }
};

// Get dimension by ID
function getDimension(dimId) {
    return DIMENSIONS[dimId];
}

// URL query parameters helper
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Navigate with query params
function navigateToQuestion(dimId, questionNumber) {
    window.location.href = `phase2-question.html?dim=${dimId}&q=${questionNumber}`;
}

function navigateToResults() {
    window.location.href = 'phase4-results.html';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    AssessmentState.init();
    console.log('Assessment State initialized:', AssessmentState);

    // Start auto-save timer if on assessment screens
    if (window.location.pathname.includes('phase2-')) {
        triggerAutoSave();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showNotification('Progress saved!', 'success');
        triggerAutoSave();
    }

    // Escape to return to dashboard
    if (e.key === 'Escape' && window.location.pathname.includes('phase2-question')) {
        if (confirm('Return to dashboard? Your progress will be saved.')) {
            window.location.href = 'phase2-dashboard.html';
        }
    }
});

// Export for use in HTML
window.AssessmentState = AssessmentState;
window.getDimension = getDimension;
window.getQueryParam = getQueryParam;
window.navigateToQuestion = navigateToQuestion;
window.navigateToResults = navigateToResults;
window.showNotification = showNotification;
window.triggerAutoSave = triggerAutoSave;
