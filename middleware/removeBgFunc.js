const cp = require('child_process');
const { writeFileSync } = require('fs');
const path = require('path');

const removeBgFunc = (fileNameAndUploadedTime) => {
  const imageDir = path.resolve(__dirname, '../uploaded_images/');
  const newDir = path.resolve(__dirname, '../bg_removed_images/');
  const pythonScript = path.resolve(__dirname, '../removeBgScript/removeBg.py');

  const result = cp.execSync(
    `python "${pythonScript}" "${path.join(imageDir, fileNameAndUploadedTime)}"`,
    {
      stdio: 'pipe',
    }
  );
  const imageBinary = Buffer.from(result.toString(), 'base64');
  writeFileSync(path.resolve(newDir, 'no-bg_' + fileNameAndUploadedTime), imageBinary);
  console.log('Bg removed successfully');
};

module.exports = removeBgFunc;
