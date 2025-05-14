/**
 * Creates and initializes a Cytoscape instance with consistent styling and behavior
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.container - DOM element to contain the graph
 * @param {Object} options.data - The Cytoscape JSON data
 * @param {boolean} options.fullscreen - Whether this is a fullscreen view
 * @returns {Object} The initialized Cytoscape instance
 */
function initCytoscapeGraph(options) {
  const { container, data, fullscreen = false } = options;
  
  // Process nodes to handle emoji in labels
  if (data.elements && data.elements.nodes) {
    data.elements.nodes.forEach(node => {
      if (node.data && node.data.label) {
        try {
          // This handles cases where the label might contain Unicode escape sequences
          const decodedLabel = JSON.parse('"' + node.data.label.replace(/"/g, '\\"') + '"');
          node.data.label = decodedLabel;
        } catch (e) {
          console.log("Error decoding label for node:", node.data.id);
        }
      }
    });
  }
  
  // Add styles for highlighting
  const highlightStyles = [
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 2,
        'border-color': '#482c73',
        'font-weight': 'bold',
        'color': '#000000',
        'text-background-opacity': 0.8,
        'text-background-padding': '2px',
        'z-index': 9999
      }
    },
    {
      selector: 'node.faded',
      style: {
        'opacity': 0.3,
        'z-index': 1
      }
    },
    {
      selector: 'edge.highlighted',
      style: {
        'line-color': '#349890',
        'width': 2,
        'opacity': 1,
        'z-index': 9999
      }
    },
    {
      selector: 'edge.faded',
      style: {
        'opacity': 0.1,
        'z-index': 1
      }
    }
  ];
  
  // Function to find the home node in the graph
  function findHomeNode(nodes) {
    // Try different ways to find the node with earth emoji
    let homeNode = nodes.find(node => node.data.id === '\ud83c\udf0e home');
    
    // If not found, try other variants or search by matching the label
    if (!homeNode) {
      homeNode = nodes.find(node => {
        const id = node.data.id || '';
        const label = node.data.label || '';
        return id.includes('home') || 
               label.includes('home') || 
               id.includes('🌎') || 
               label.includes('🌎');
      });
    }
    return homeNode;
  }

  // Function to filter elements to show nodes connected to the home node and one layer beyond
  function filterElements(elements) {
    const homeNode = findHomeNode(elements.nodes);
    if (!homeNode) return elements; // Return all if home node not found

    // Find all nodes directly connected to the home node
    const homeId = homeNode.data.id;
    const firstDegreeNodes = new Set();
    firstDegreeNodes.add(homeId); // Always include the home node

    // Add nodes directly connected to the home node
    elements.edges.forEach(edge => {
      if (edge.data.source === homeId) {
        firstDegreeNodes.add(edge.data.target);
      } else if (edge.data.target === homeId) {
        firstDegreeNodes.add(edge.data.source);
      }
    });

    // Find nodes connected to first-degree nodes (2nd degree)
    const connectedNodes = new Set(firstDegreeNodes); // Start with first-degree nodes
    elements.edges.forEach(edge => {
      const source = edge.data.source;
      const target = edge.data.target;
      
      // If either node is in first-degree nodes, add the other node
      if (firstDegreeNodes.has(source)) {
        connectedNodes.add(target);
      } else if (firstDegreeNodes.has(target)) {
        connectedNodes.add(source);
      }
    });

    // Filter nodes and edges
    const filteredNodes = elements.nodes.filter(node => connectedNodes.has(node.data.id));
    const filteredEdges = elements.edges.filter(edge => 
      connectedNodes.has(edge.data.source) && connectedNodes.has(edge.data.target)
    );

    return {
      nodes: filteredNodes,
      edges: filteredEdges
    };
  }

  // Initialize Cytoscape

  // Set initial zoom level based on fullscreen state - higher values mean more zoomed in
  let userZoom = fullscreen ? 1.5 : 1.5; 

  // Use the original data elements for fullscreen mode, filtered elements for non-fullscreen
  const elementsToUse = fullscreen ? data.elements : filterElements(data.elements);

  const cy = cytoscape({
    container: container,
    elements: elementsToUse,
    
    // Styling
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'color': '#333333',
          'background-color': '#8752d7',
          'width': 15,
          'height': 15,
          'font-size': '10px',
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'text-max-width': '80px',
          'transition-property': 'background-color, border-color, line-color, opacity, width, height',
          'transition-duration': '0.2s'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': '#999999',
          'curve-style': 'bezier',
          'opacity': 0.6,
          'transition-property': 'line-color, opacity, width',
          'transition-duration': '0.2s'
        }
      },
      ...highlightStyles
    ],
    
    // Interaction settings
    userZoomingEnabled: true,
    userPanningEnabled: true,
    minZoom: 0.1,
    maxZoom: 5,
    userZoom: userZoom
  });
  
  // Track zoom level changes from user interaction
  cy.on('zoom', function() {
    userZoom = cy.zoom();
  });
  
  // Initial layout settings
  const layoutOptions = {
    name: 'cola',
    animate: true,
    randomize: true,
    fit: false,
    padding: 50,
    nodeSpacing: 15,
    edgeLength: 100,
    avoidOverlap: true,
    maxSimulationTime: 2000,
    infinite: true,
    // Add circle constraint
    constraints: [
      {
        type: 'circle',
        position: { x: 0, y: 0 }, // Center of the circle (will be adjusted)
        radius: 100 // Adjust this value based on your graph size
      }
    ],
    ready: function() {
      // Find the home node using our helper function
      const homeNode = findHomeNode(cy.nodes().toArray());
      
      // If we have a home node, update the circle constraint position to center on it
      if (homeNode) {
        const pos = homeNode.position();
        layoutOptions.constraints[0].position = { x: pos.x, y: pos.y };
      }
      
      cy.zoom(userZoom);
      if (homeNode) {
        cy.center(homeNode);
      } else {
        cy.center();
      }
      
      if (fullscreen) {
        // For fullscreen, we want to fit everything
        cy.fit(100);
        
        // Try to center on home node if found
        if (homeNode) {
          cy.center(homeNode);
        } else {
          cy.center();
        }
      } else {
        // Set the zoom level first
        cy.zoom(userZoom);
        
        // Center on the home node if found
        if (homeNode) {
          cy.center(homeNode);
        } else {
          cy.center();
        }
      }
    },
    tick: function() {
      // Don't force zoom updates during simulation - causes jittery behavior
      // The zoom will be set after layout completes in the ready function
    }
  };
  
  // Run the initial layout
  cy.layout(layoutOptions).run();
  
  // Apply zoom directly after layout initialization to ensure it sticks
  if (!fullscreen) {
    // Hard-set zoom for homepage after a delay
    setTimeout(() => {
      cy.zoom(userZoom);
    }, 500);
  }
  
  // Node hover effects
  cy.on('mouseover', 'node', function(e) {
    e.target.style({
      'width': 20,
      'height': 20,
      'font-size': '12px',
      'z-index': 9999
    });
  });
  
  cy.on('mouseout', 'node', function(e) {
    e.target.style({
      'width': 15,
      'height': 15,
      'font-size': '10px',
      'z-index': 999
    });
  });
  
  // Double-click to open URL
  cy.on('dblclick', 'node', function(e) {
    const node = e.target;
    const url = node.data('url');
    if (url) {
      window.open(url, '_blank');
    }
  });
  
  // Node selection and neighbor highlighting
  cy.on('tap', function(event) {
    // If tap on background, clear highlighting
    if (event.target === cy) {
      resetHighlighting();
    }
  });
  
  cy.on('tap', 'node', function(event) {
    const node = event.target;
    highlightNodeNeighborhood(node);
    event.stopPropagation();
  });
  
  function highlightNodeNeighborhood(node) {
    // Reset any existing highlighting
    resetHighlighting();
    
    // Get the node's neighborhood (connected nodes and edges)
    const neighborhood = node.neighborhood().add(node);
    
    // First apply the faded class to all elements
    cy.elements().addClass('faded');
    
    // Then remove faded and add highlighted to the neighborhood
    neighborhood.removeClass('faded');
    neighborhood.addClass('highlighted');
    
    // For visual stability, prevent any major layout shifts
    // by locking nodes briefly during highlighting
    cy.nodes().lock();
    
    // Unlock after a short delay to allow for further interaction
    setTimeout(() => {
      cy.nodes().unlock();
    }, 300);
  }
  
  function resetHighlighting() {
    cy.elements().removeClass('highlighted faded');
  }
  
  // Update graph styling when theme changes
  const updateGraphTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const isDark = theme === 'dark';
    
    cy.style()
      .selector('node')
      .style({
        'color': isDark ? '#e0e0e0' : '#333333' 
      })
      .selector('node.highlighted')
      .style({
        'color': isDark ? '#ffffff' : '#000000',
        'text-background-color': isDark? '#404040' : '#ffffff', 
      })
      .update();
  };
  
  // Set initial theme
  updateGraphTheme();
  
  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        updateGraphTheme();
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
}