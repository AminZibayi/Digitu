export * from './Service';
export * from './fixtureLoader';

// Basic CLI support to test fixture loading if run directly
if (typeof require !== 'undefined' && require.main === module) {
  const args = process.argv.slice(2);
  const fixtureIndex = args.indexOf('--fixture');
  
  if (fixtureIndex !== -1 && args[fixtureIndex + 1]) {
    const fixtureName = args[fixtureIndex + 1];
    const { loadFixture } = require('./fixtureLoader');
    const path = require('path');
    
    try {
      // Default to a 'fixtures' dir in cwd
      const fixturesDir = path.join(process.cwd(), 'fixtures');
      const data = loadFixture(fixturesDir, fixtureName);
      console.log(`Successfully loaded fixture '${fixtureName}' with ${data.length} items.`);
    } catch (err) {
      console.error(`Failed to load fixture '${fixtureName}':`, err);
      process.exit(1);
    }
  }
}
