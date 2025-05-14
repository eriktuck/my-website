// Cytoscape implementation with Obsidian-like interactive features
window.addEventListener('load', () => {
  // Check if the graph container exists on the page
  const cyContainer = document.getElementById('cy');
  if (!cyContainer) return;
  
  // Find the expand button and modal elements
  const expandButton = document.querySelector('.expand-graph-btn');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalContent = modalOverlay.querySelector('.modal-content');
  const cyFullscreen = document.querySelector('#cy-fullscreen');
  const closeButton = modalContent.querySelector('.close-modal');
  const heroButton = document.querySelector('.hero-buttons .primary-button');
  
  // Variable to store cytoscape instances
  let mainCy = null;
  let fullscreenCy = null;

  // Use the data exposed by Hugo
  const rawHugoData = window.hugoData.cytoscapeData;

  // Parse the JSON string from Hugo
  const parsedData = JSON.parse(rawHugoData);
  
  // Event listeners for modal
  [expandButton].forEach(button => {
    button.addEventListener('click', () => {
      modalOverlay.style.display = 'flex';
      
      // Only create the fullscreen instance if it doesn't exist yet
      if (!fullscreenCy) {
        
        // Initialize the fullscreen graph with the same data and behavior
        fullscreenCy = initCytoscapeGraph({
          container: cyFullscreen,
          data: parsedData,
          fullscreen: true
        });
        
        // Add resize handler for fullscreen view
        window.addEventListener('resize', () => {
          if (fullscreenCy) {
            fullscreenCy.resize();
            fullscreenCy.center();
          }
        });
      } else {
        // If the fullscreen instance already exists, resize it
        setTimeout(() => {
          fullscreenCy.resize();
          fullscreenCy.center();
        }, 100);
      }
    });
  });
  
  closeButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });
  
  // Close modal when clicking outside of content
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay.style.display === 'flex') {
      modalOverlay.style.display = 'none';
    }
  });

  // Initialize the main cytoscape graph
  mainCy = initCytoscapeGraph({
    container: cyContainer,
    data: parsedData,
    fullscreen: false
  });  
});


