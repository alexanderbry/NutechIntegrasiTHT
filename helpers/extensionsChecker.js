async function extensionsChecker(filename) {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = filename.split(".").pop().toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    return true;
  } else {
    return false;
  }
}

module.exports = extensionsChecker;
