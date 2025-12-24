// Simple MCP healthcheck + list_components smoke test
const MCP_URL = (process.env.MCP_SERVER_URL || 'http://localhost:7423').replace(/\/$/, '');

async function main() {
  try {
    console.log('Checking MCP health at', MCP_URL + '/health');
    const healthRes = await fetch(MCP_URL + '/health');
    const healthText = await healthRes.text();
    console.log('Health status:', healthRes.status);
    console.log('Health body:', healthText);

    console.log('\nCalling MCP tool: list_components');
    const toolRes = await fetch(MCP_URL + '/tool', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tool: 'list_components', args: {} }),
    });

    const toolJson = await toolRes.json().catch(() => null);
    console.log('Tool endpoint status:', toolRes.status);
    console.log('Tool response:', JSON.stringify(toolJson, null, 2));

    if ((healthRes.ok || healthRes.status === 200) && toolRes.ok) {
      console.log('\nMCP healthcheck and tool call succeeded.');
      process.exit(0);
    }

    console.error('\nOne or more checks failed.');
    process.exit(2);
  } catch (err) {
    console.error('Healthcheck failed:', err);
    process.exit(1);
  }
}

main();
