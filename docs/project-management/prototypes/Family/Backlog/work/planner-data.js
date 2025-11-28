// Extract data from complete planner
const dataScript = document.createElement('script');
dataScript.textContent = `
// Load data from complete planner file
fetch('mvp1-complete-planner.html')
    .then(r => r.text())
    .then(html => {
        // Extract blocksData from the HTML
        const match = html.match(/const blocksData = \[([\s\S]*?)\];[\s\S]*?\/\/ Flatten all stories/);
        if (match) {
            eval('const blocksData = [' + match[1] + '];');
            blocksData.forEach(block => {
                allStories = allStories.concat(block.stories);
            });
            init();
        }
    });
`;
