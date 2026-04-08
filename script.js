function toggleView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show the targeted view
    document.getElementById(viewId).classList.add('active');
}
