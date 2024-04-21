function calculateWater() {
  const blocksInput = document.getElementById('blocks-input').value;
  const blocks = blocksInput.split(',').map(Number);
  const waterUnits = calculateWaterUnits(blocks);
  visualizeWater(blocks, waterUnits);
}

function calculateWaterUnits(blocks) {
  let leftMax = 0;
  let rightMax = 0;
  let waterUnits = 0;

  let left = 0;
  let right = blocks.length - 1;

  while (left < right) {
      if (blocks[left] < blocks[right]) {
          if (blocks[left] > leftMax) {
              leftMax = blocks[left];
          } else {
              waterUnits += leftMax - blocks[left];
          }
          left++;
      } else {
          if (blocks[right] > rightMax) {
              rightMax = blocks[right];
          } else {
              waterUnits += rightMax - blocks[right];
          }
          right--;
      }
  }
  return waterUnits;
}

function visualizeWater(blocks, waterUnits) {
const visualizationContainer = document.getElementById('visualization');
visualizationContainer.innerHTML = '';

const width = 30;
const heightFactor = 20;
const xOffset = 10;
const yOffset = 10;
const blockMargin = 5;

const svgWidth = (width + blockMargin) * blocks.length + xOffset * 2;
const svgHeight = Math.max(...blocks) * heightFactor + yOffset * 2;

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', svgWidth);
svg.setAttribute('height', svgHeight);

for (let i = 0; i < blocks.length; i++) {
const rectHeight = blocks[i] * heightFactor;
const rectWidth = width;

const rectX = xOffset + i * (width + blockMargin);
const rectY = svgHeight - yOffset - rectHeight;

const blockRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
blockRect.setAttribute('x', rectX);
blockRect.setAttribute('y', rectY);
blockRect.setAttribute('width', rectWidth);
blockRect.setAttribute('height', rectHeight);
blockRect.setAttribute('fill', '#000000');

svg.appendChild(blockRect);

const waterHeight = Math.min(blocks[i], waterUnits / width);
const waterRectHeight = waterHeight * heightFactor;

}

visualizationContainer.appendChild(svg);

const waterUnitsElement = document.createElement('div');
waterUnitsElement.classList.add('water-units');
waterUnitsElement.textContent = `Water units: ${waterUnits}`;
visualizationContainer.appendChild(waterUnitsElement);

svg.appendChild(text);
}
