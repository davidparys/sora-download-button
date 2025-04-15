// Function to create download button
function createDownloadButton() {
  const button = document.createElement('button');
  button.className = 'inline-flex gap-1.5 items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-default data-[disabled=true]:opacity-50 group/button relative rounded-full pointer-events-auto p-[7px] text-white hover:bg-token-bg-active hover:backdrop-blur-[6px]';
  
  // Add download icon (matching Sora's design)
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" class="h-[18px] w-[18px]">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 10l-5 5m0 0l-5-5m5 5V3"/>
    </svg>
  `;
  
  button.title = "Download Image";
  return button;
}

// Function to handle download
function handleDownload(imgSrc) {
  console.log('Downloading image:', imgSrc);
  
  // Open in new tab
  window.open(imgSrc, '_blank');
  
  // Create a temporary link for download
  const link = document.createElement('a');
  
  // Get the original URL without query parameters
  const baseUrl = imgSrc.split('?')[0];
  
  // Set download attributes
  link.href = imgSrc;
  
  // Extract filename from URL
  const filename = baseUrl.split('/').pop() || 'sora-image.webp';
  link.download = filename;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Main function to add download buttons
function addDownloadButtons() {
  console.log('Searching for image containers...');
  
  // Find all image containers - try multiple possible selectors
  const imageContainers = document.querySelectorAll('div[data-index], .group.relative.h-full.w-full');
  console.log('Found containers:', imageContainers.length);
  
  imageContainers.forEach((container, index) => {
    // Check if button already exists
    if (container.querySelector('.sora-download-button')) {
      console.log('Button already exists for container', index);
      return;
    }
    
    // Find the image element - try multiple possible sources
    const img = container.querySelector('img[src*="videos.openai.com"], img[src*="vg-assets"]');
    if (!img || !(img instanceof HTMLImageElement)) {
      console.log('No valid image found in container', index);
      return;
    }
    
    // Find the button container - specifically the flex container with gap-0.5
    const buttonGroup = container.querySelector('.flex.shrink-0.gap-0\\.5');
    if (!buttonGroup) {
      console.log('No button group found for container', index);
      return;
    }
    
    console.log('Adding download button to container', index);
    
    // Create download button
    const downloadButton = createDownloadButton();
    downloadButton.classList.add('sora-download-button');
    
    // Add click handler
    downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleDownload(img.src);
    });
    
    // Create a div wrapper to match the structure
    const buttonWrapper = document.createElement('div');
    buttonWrapper.setAttribute('data-state', 'closed');
    buttonWrapper.appendChild(downloadButton);
    
    // Insert the button wrapper as the last child of the button group
    buttonGroup.appendChild(buttonWrapper);
  });
}

// Wait for the page to load
window.addEventListener('load', () => {
  console.log('Page loaded, initializing download buttons...');
  // Run initially
  setTimeout(addDownloadButtons, 1000); // Give React a chance to render
  
  // Set up observer for dynamic content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        setTimeout(addDownloadButtons, 500); // Add slight delay to ensure React has finished rendering
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// Also run on navigation changes (for single-page app navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('URL changed, reinitializing download buttons...');
    setTimeout(addDownloadButtons, 1000);
  }
}).observe(document, { subtree: true, childList: true }); 