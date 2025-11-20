const authModal = document.getElementById('auth-modal');
const loginButtons = [
	document.getElementById('login-modal-btn'),
	document.getElementById('mobile-login-btn')
];
const closeBtn = document.getElementById('modal-close-btn');
const modalOverlay = document.getElementById('auth-modal');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavLinks = document.getElementById('mobile-nav-links');
const menuIcon = document.getElementById('menu-icon');

const radioStudent = document.getElementById('radio-student');
const radioCompany = document.getElementById('radio-company');
const studentContent = document.getElementById('student-content');
const companyForm = document.getElementById('company-form');
const switchModeBtn = document.getElementById('switch-mode-btn');
const modalTitle = document.getElementById('modal-title');
const submitBtn = document.getElementById('submit-btn');
const companyNameGroup = document.getElementById('company-name-group');

let isLoginMode = true;
let currentAccountType = 'student';
let isMobileMenuOpen = false;


function showModal() {
	authModal.style.display = 'flex';
}

function hideModal() {
	authModal.style.display = 'none';
}


function updateModalContent() {
	modalTitle.textContent = isLoginMode ? 'Log In' : 'Sign Up';
	submitBtn.textContent = isLoginMode ? 'Log In' : 'Create Account';
	switchModeBtn.textContent = isLoginMode ? 'Sign Up' : 'Log In';

	const toggleAuthDiv = switchModeBtn.parentNode;
	toggleAuthDiv.firstChild.textContent = isLoginMode ? "Don't have an account?" : "Already have an account?";

	// student vs company views
	if (currentAccountType === 'student') {
		studentContent.style.display = 'block';
		companyForm.style.display = 'none';
	} else {
		studentContent.style.display = 'none';
		companyForm.style.display = 'block';

		companyNameGroup.style.display = isLoginMode ? 'none' : 'block';
		companyNameGroup.querySelector('input').required = !isLoginMode;
	}
}

loginButtons.forEach(btn => btn?.addEventListener('click', () => {
	isLoginMode = true;
	currentAccountType = 'student'; // by default we can pretty much assume a student is trying to login, in the future we might want to standardize this more?
	radioStudent.checked = true;
	updateModalContent();
	showModal();
}));

closeBtn?.addEventListener('click', hideModal);

modalOverlay?.addEventListener('click', (e) => {
	if (e.target === modalOverlay) {
		hideModal();
	}
});

switchModeBtn?.addEventListener('click', () => {
	isLoginMode = !isLoginMode;
	updateModalContent();
});

radioStudent?.addEventListener('change', () => {
	currentAccountType = 'student';
	updateModalContent();
});

radioCompany?.addEventListener('change', () => {
	currentAccountType = 'company';
	updateModalContent();
});

mobileMenuBtn?.addEventListener('click', () => {
	isMobileMenuOpen = !isMobileMenuOpen;
	mobileNavLinks.style.display = isMobileMenuOpen ? 'flex' : 'none';
	menuIcon.textContent = isMobileMenuOpen ? 'X' : '☰';
});

companyForm?.addEventListener('submit', (e) => {
	e.preventDefault();
	hideModal();
});

document.addEventListener('DOMContentLoaded', updateModalContent);