// Load user profile on page load
window.addEventListener('load', function() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }

    loadUserProfile();
});

function loadUserProfile() {
    try {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);

        const loadingSpinner = document.getElementById('loadingSpinner');
        const profileContent = document.getElementById('profileContent');

        // Simulate loading delay
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            profileContent.style.display = 'block';

            // Display user information
            const firstName = user.firstName || '';
            const lastName = user.lastName || '';
            const fullName = (firstName + ' ' + lastName).trim() || 'User';
            const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';

            document.getElementById('userName').textContent = fullName;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('fullName').textContent = fullName;
            document.getElementById('emailDisplay').textContent = user.email;
            document.getElementById('userAvatar').textContent = initials;

            // Get current date
            const now = new Date();
            document.getElementById('lastLogin').textContent = now.toLocaleString();

            // Try to get member since date from localStorage or show today
            document.getElementById('memberSince').textContent = now.toLocaleDateString();

        }, 500);

    } catch (error) {
        console.error('Error loading profile:', error);
        window.location.href = 'index.html';
    }
}

function refreshProfile() {
    const profileContent = document.getElementById('profileContent');
    const loadingSpinner = document.getElementById('loadingSpinner');

    profileContent.style.display = 'none';
    loadingSpinner.style.display = 'block';
    loadingSpinner.innerHTML = '<div class="spinner"></div><p style="color: #667eea; margin-top: 15px;">Refreshing profile...</p>';

    setTimeout(() => {
        loadUserProfile();
    }, 500);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Redirect to login
        window.location.href = 'index.html';
    }
}