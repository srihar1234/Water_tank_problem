function calculateWater() {
  const blocksInput = document.getElementById('blocks-input').value;
  const blocks = blocksInput.split(',').map(Number);
  const waterUnits = calculateWaterUnits(blocks);
  visualizeWater(blocks, waterUnits);
}


function calculateWaterUnits(blocks) {
    let waterUnits = 0;

    const leftMax = [];
    const rightMax = [];
    leftMax[0] = blocks[0];
    rightMax[blocks.length - 1] = blocks[blocks.length - 1];
    for (let i = 1; i < blocks.length; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], blocks[i]);
      rightMax[blocks.length - 1 - i] = Math.max(rightMax[blocks.length - i], blocks[blocks.length - 1 - i]);
    }
  
    for (let i = 0; i < blocks.length; i++) {
      const minMax = Math.min(leftMax[i], rightMax[i]);
      waterUnits += Math.max(minMax - blocks[i], 0);
    }
  
    return waterUnits;
  }
  

  function visualizeWater(blocks, waterUnits) {
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.innerHTML = '';
  
    const maxBlockHeight = Math.max(...blocks);
    const table = document.createElement('table');
    table.classList.add('visualization-table');
    table.style.width = '80%'; 
  
    const tableHeight = (maxBlockHeight + 1) * 40; 
    table.style.height = `${tableHeight}px`;
  
  
    table.style.borderCollapse = 'collapse';
    table.style.borderSpacing = '0';
  

    for (let i = maxBlockHeight; i >= 0; i--) {
      const row = document.createElement('tr');
      row.classList.add('row');
      
 
      for (let j = 0; j < blocks.length; j++) {
        const cell = document.createElement('td');
        cell.classList.add('cell');

        cell.style.border = '1px solid #000000';
        
  
        if (blocks[j] >= i) {
          cell.style.backgroundColor = '#808080'; 
        }
        
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }
  
    visualizationContainer.appendChild(table);
  
    const waterUnitsElement = document.createElement('div');
    waterUnitsElement.classList.add('water-units');
    waterUnitsElement.textContent = `Water units: ${waterUnits} units`;
    visualizationContainer.appendChild(waterUnitsElement);
  }

